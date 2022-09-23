import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import ContactsFloatingIcon from "../components/ContactsFloatingIcon";
import ListItem from "../components/ListItem";
import Context from "../context/Context";
import { auth, db } from "../Firebase";
import useContacts from "../hooks/useHooks";

function Chats() {
  const { currentUser } = auth;
  const { rooms, setRooms, setUnfilteredRooms } = useContext(Context);
  const contacts = useContacts();
  const chatsQuery = query(
    collection(db, "rooms"),
    where("participantsArray", "array-contains", currentUser.email)
  );
  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs
        .filter((doc) => doc.data().lastMessage)
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
          userB: doc
            .data()
            .participants.find((p) => p.email !== currentUser.email),
        }));
      setUnfilteredRooms(parsedChats);
      setRooms(parsedChats.filter((doc) => doc.lastMessage));
    });
    return () => unsubscribe();
  }, []);

  function getUserB(user, contacts) {
    const userContact = contacts.find((c) => c.email === user.email);
    if (userContact && userContact.contactName) {
      return { ...user, contactName: userContact.contactName };
    } else return user;
  }

  return (
    <View style={styles.rootContainer}>
      {rooms.map((room) => (
        <ListItem
          type="chat"
          description={room.lastMessage.text}
          key={room.id}
          room={room}
          time={room.lastMessage.createdAt}
          user={getUserB(room.userB, contacts)}
        />
      ))}
      <ContactsFloatingIcon />
    </View>
  );
}

export default Chats;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 5,
    paddingRight: 10,
  },
});

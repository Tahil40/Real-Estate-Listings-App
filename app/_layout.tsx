// import {
//     Alert,
//     FlatList,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import "../global.css";

const properties_array = [
  { id: "1", title: "Modern Villa", city: "Mumbai", price: "$1.2cr" },
  { id: "2", title: "Modern Villa", city: "Mumbai", price: "$1.2cr" },
  { id: "3", title: "Modern Villa", city: "Mumbai", price: "$1.2cr" },
  { id: "4", title: "Modern Villa", city: "Mumbai", price: "$1.2cr" },
];

export default function RootLayout() {
  return (
    <Slot />
    // <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    //   <View style={{ padding: 16 }}>
    //     <Text>Welcome in Real State App</Text>
    //     <TextInput
    //       placeholder="Search City.."
    //       placeholderTextColor={"#999"}
    //       style={{
    //         borderWidth: 1,
    //         borderColor: "#ddd",
    //         borderRadius: 8,
    //         padding: 10,
    //         marginTop: 12,
    //       }}
    //     />
    //     {/* Adding button */}
    //     <TouchableOpacity
    //       style={{
    //         backgroundColor: "#2563EB",
    //         padding: 12,
    //         borderRadius: 8,
    //         marginTop: 10,
    //         alignItems: "center",
    //       }}
    //       onPress={() => {
    //         Alert.alert("Searching....");
    //       }}
    //     >
    //       <Text style={{ color: "#fff" }}>Search</Text>
    //     </TouchableOpacity>
    //   </View>
    //   {/* rendering list over here */}
    //   <FlatList
    //     data={properties_array}
    //     keyExtractor={(item) => item.id}
    //     contentContainerStyle={{ padding: 16 }}
    //     renderItem={({ item }) => (
    //       <View
    //         style={{
    //           backgroundColor: "#f9f9f9",
    //           padding: 12,
    //           borderRadius: 10,
    //           marginBottom: 10,
    //         }}
    //       >
    //         <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
    //         <Text style={{ color: "#666" }}>{item.city}</Text>
    //         <Text style={{ color: "#2563EB" }}>{item.price}</Text>
    //       </View>
    //     )}
    //   />
    // </SafeAreaView>
  );
}

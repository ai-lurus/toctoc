import { useEffect } from "react";
import { Stack, useNavigation } from "expo-router";
import { StackActions } from "@react-navigation/native";

export default function HistoryLayout() {
    const navigation = useNavigation();

    useEffect(() => {
        const parent = navigation.getParent();
        const unsubscribe = parent?.addListener("tabPress" as any, () => {
            navigation.dispatch(StackActions.popToTop());
        });
        return unsubscribe;
    }, [navigation]);

    return <Stack screenOptions={{ headerShown: false }} />;
}

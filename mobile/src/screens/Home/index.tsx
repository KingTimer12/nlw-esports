import { Image, FlatList } from "react-native";

import logoImg from "../../assets/logo-nlw-esports.png";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";
import { useNavigation } from '@react-navigation/native'

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation()

  useEffect(() => {
    fetch("http://192.168.0.115:3333/games")
      .then((response) => response.json())
      .then(setGames);
  }, []);

  function handleOpenGame({id, title, bannerUrl}: GameCardProps) {
    navigation.navigate('game', {id, title, bannerUrl})
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Encontre seu duo"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <GameCard data={item} onPress={() => handleOpenGame(item)} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}

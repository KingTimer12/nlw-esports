import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";
import { useRoute } from "@react-navigation/native";
import { View, TouchableOpacity, Image, FlatList, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { useEffect, useState } from "react";

import { styles } from "./styles";
import { GameParams } from "../../@types/navigation";
import { THEME } from "../../theme";

import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";

import { useNavigation } from "@react-navigation/native";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch";
import axios from "axios";

export function Game() {
  const route = useRoute();
  const { title, bannerUrl, id } = route.params as GameParams;
  const navigation = useNavigation();
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordText, setDiscordText] = useState('')

  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchDiscordUser(adsId: string) {
    await axios(`http://192.168.0.115:3333/ads/${adsId}/discord`).then((response) => setDiscordText(response.data.discord));
  }

  useEffect(() => {
    axios(`http://192.168.0.115:3333/games/${id}/ads`).then((response) => setDuos(response.data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          contentContainerStyle={duos.length > 0 ? styles.contentList : styles.emptyListContent}
          style={styles.containerList}
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <DuoCard onConnect={async () => await fetchDiscordUser(item.id)} data={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados para esse jogo
            </Text>
          )}
        />

        <DuoMatch discord={discordText} onClose={() => setDiscordText('')} visible={discordText.length > 0} />
      </SafeAreaView>
    </Background>
  );
}

import { View, TouchableOpacity, Text } from "react-native";
import { GameController } from "phosphor-react-native";

import { THEME } from "../../theme";
import { DuoInfo } from "./DuoInfo";

import { styles } from "./styles";

export interface DuoCardProps {
  id: string;
  hourEnd: string;
  hourStart: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
  const { name, yearsPlaying, useVoiceChannel, weekDays, hourEnd, hourStart } =
    data;

  const yearPlayingString =
    yearsPlaying == 1 ? `1 ano` : `${yearsPlaying} anos`;

  const weekDaysString =
    weekDays.length == 1 ? `1 dia` : `${weekDays.length} dias`;

  const useVoiceChannelString = useVoiceChannel ? `Sim` : `Não`;
  const useVoiceChannelColor = useVoiceChannel
    ? THEME.COLORS.SUCCESS
    : THEME.COLORS.ALERT;

  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={name} />
      <DuoInfo label="Tempo de jogo" value={yearPlayingString} />
      <DuoInfo
        label="Disponibilidade"
        value={`${weekDaysString} • ${hourStart} - ${hourEnd}`}
      />
      <DuoInfo
        label="Chamada de audio?"
        value={useVoiceChannelString}
        colorValue={useVoiceChannelColor}
      />

      <TouchableOpacity onPress={onConnect} style={styles.button}>
        <GameController color={THEME.COLORS.TEXT} size={20} />
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}

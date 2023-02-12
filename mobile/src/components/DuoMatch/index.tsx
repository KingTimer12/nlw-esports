import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicatorBase, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CheckCircle } from "phosphor-react-native";
import * as Clipboard from 'expo-clipboard';

import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "../Heading";

import { useState } from "react";

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [coppied, setCoppied] = useState(false)

  async function handleCopyText() {
    setCoppied(true)
    await Clipboard.setStringAsync(discord).then(() => {
      Alert.alert('Discord Copiado', 'Usuário copiada para área de transferência')
      setCoppied(false)
    })
  }

  return (
    <Modal animationType="fade" transparent statusBarTranslucent {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

          <Heading
            title="Let's play"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: "center", marginTop: 24 }}
          />

          <Text style={styles.label}>Adicione no Discord</Text>

          <TouchableOpacity style={styles.discordButton} onPress={handleCopyText} disabled={coppied}>
            <Text style={styles.discord}>{coppied ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

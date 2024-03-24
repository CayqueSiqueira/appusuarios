import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

type Props = {
  name: string;
  email: string;
  cpf: string;
  onRemove?: () => void;
}

export function Users({name, email, cpf, onRemove}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.middle}>
          <Text style={styles.name}>
            {name}
          </Text>
          <Text style={styles.name}>
            {email}
          </Text>
          <Text style={styles.name}>
            {cpf}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.button}
          onPress={onRemove}
          >
          <Text>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
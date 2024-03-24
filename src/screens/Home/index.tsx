import { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";

import { styles } from './styles';
import { Users } from "../../components/Users";

type Props = {
  id: string,
  name: string,
  email: string,
  cpf: string
}

export function Home() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [users, setUsers] = useState<Props[]>([])

  function handleAddNewUser() {
    if (name.trim() === '' || email.trim() === '' || cpf.trim() === '')
    {
      return Alert.alert('Preencha todos os campos')
    }

    const existeEmail = users.filter(objetoVerificado => objetoVerificado.email === email.trim())//verifica se existe na lista
    console.log(existeEmail)
    if (existeEmail.length > 0) { 
      return Alert.alert('Atenção',
        'Email já adicionado')
    }

    const existeCpf = users.filter(objetoVerificado => objetoVerificado.cpf === cpf.trim())//verifica se existe na lista
    console.log(existeCpf)
    if (existeCpf.length > 0) { 
      return Alert.alert('Atenção',
        'Cpf já adicionado')
    }

    const cpfRegex = /^\d{11}$/;
      if (!cpfRegex.test(cpf)) 
      { 
        return Alert.alert('CPF', 'CPF inválido. Deve conter 11 números e não pode conter outro tipo de caractere.');
      }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) 
    {
      return Alert.alert('Email', 'E-mail inválido. Por favor, insira um e-mail válido.');
    }

    const data = {
      id: String(new Date().getTime()),
      name,
      email,
      cpf
    }

    console.log(data)
    setUsers([...users, data])
    setName('')
    setEmail('')
    setCpf('') 

    // criar uma validação com o email
    // nao pode cadastrar o mesmo email para usuarios diferentes
  }

  function handleRemoveUser(name: string, cpf: string) {
    console.log(`Você quer remover o usuario ${name} de cpf ${cpf}`)
    Alert.alert(`Remover`,`Remover o usuario ${name}`, [
      {
        text: 'Sim',
        onPress: () => setUsers(users.filter(x => x.cpf !== cpf)) 
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Cadastro de Usuários
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do usuário"
          placeholderTextColor='#6B6B6B'
          autoCapitalize="words"
          value={name}
          onChangeText={value => setName(value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email do usuário"
          placeholderTextColor='#6B6B6B'
          autoCapitalize="none"
          value={email}
          onChangeText={value => setEmail(value)}
        />

        <TextInput
          style={styles.input}
          placeholder="CPF do usuário"
          placeholderTextColor='#6B6B6B'
          keyboardType="numeric"
          value={cpf}
          onChangeText={value => setCpf(value)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleAddNewUser}
        >
          <Text style={styles.buttonText}>
            Incluir
          </Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={users}
        keyExtractor={item => item.cpf.toString()}
        renderItem={({ item }) => (
          <Users
            name={item.name}
            email={item.email}
            cpf={item.cpf}
            onRemove={() => handleRemoveUser(item.name, item.cpf)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Adicione participante a sua lista de presença
          </Text>
        )}
      />


    </View>
  )
}



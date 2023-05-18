import { useEffect } from 'react'
import {
  Platform,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { styled } from 'nativewind'
import { useRouter } from 'expo-router'

import * as NavigationBar from 'expo-navigation-bar'
import * as SecureStore from 'expo-secure-store'

import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { api } from '../src/lib/api'
import { useCustomFonts } from '../src/hooks/useCustomFonts'
import { useGihubOAuth } from '../src/hooks/useGihubOAuth'

const StyledStripes = styled(Stripes)

export default function App() {
  const router = useRouter()
  const [hasLoadedFonts] = useCustomFonts()
  const [response, signInWithGithub] = useGihubOAuth()

  async function handleGithubOAuthCode(code: string) {
    const response = await api.post('/register', { code })
    const { token } = response.data

    await SecureStore.setItemAsync('token', token)

    router.push('/memories')
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params
      handleGithubOAuthCode(code)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response])

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync('#121215')
    }
  }, [])

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 items-center bg-gray-900 px-8 py-10"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-8 py-2"
          onPress={() => signInWithGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>

      <StatusBar style="light" />
    </ImageBackground>
  )
}

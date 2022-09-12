import BtnDigit from '@/components/ui/BtnDigit.vue'
import SupportTable from '@/components/ui/SupportTable.vue'
import MoveTable from '@/components/ui/MoveTable.vue'
import Alert from '@/components/ui/Alert.vue'
import MobileKey from '@/components/ui/MobileKey.vue'
import WindowWin from '@/components/ui/WindowWin.vue'
import Backgraund from '@/components/ui/Backgraund.vue'

// • ui
import PixelButton from '@/components/ui/Pixel-button.vue'
import ButtonBack from '@/components/ui/Button-back.vue'

// • game
import ContextMenu from '@/components/game/ContextMenu.vue'


// • multiplayer
import Login from '@/components/multiplayer/Login.vue'
import MultiplayerMenu from '@/components/multiplayer/Menu.vue'
import PixelSpinner from '@/components/multiplayer/PixelSpinner.vue'
import CreateNumber from '@/components/multiplayer/CreateNumber.vue'


// • main menu
import info from '@/components/mainMenu/info.vue'
import AlertScreen from '@/components/mainMenu/AlertScreen.vue'
import modalWindow from '@/components/mainMenu/modalWindow.vue'

// • main modalWindow
import Rules from '@/components/mainMenu/modal/Rules.vue'
import Support from '@/components/mainMenu/modal/Support.vue'
import AppMobileDownload from '@/components/mainMenu/modal/AppMobile.vue'
import Interface from '@/components/mainMenu/modal/Interface.vue'


export default [

  BtnDigit,
  SupportTable,
  MoveTable,
  Alert,
  MobileKey,
  WindowWin,
  Backgraund,

  // • ui
  PixelButton,
  ButtonBack,

  // • game
  ContextMenu,

  // • multiplayer
  Login,
  MultiplayerMenu,
  PixelSpinner,
  CreateNumber,


  // • main menu
  // RulesGame,
  // HelpDev,
  info,
  AlertScreen,
  modalWindow,

  // • main modalWindow
  Rules,
  Support,
  AppMobileDownload,
  Interface

]
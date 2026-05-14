import Feather from "@react-native-vector-icons/feather";
import Ionicons from "@react-native-vector-icons/ionicons";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { registerCustomIconType } from "@rneui/themed";

// Bypass RNE's internal try { require(new) } catch { require(old); warn() }
// resolution and bind the modular icon sets directly. Without this, every
// Icon render emits a deprecation warning whenever RNE's runtime require of
// the modular package fails for any reason (Metro cache, resolver edge cases).
// "material" must be registered too because RNE falls back to it as the
// default type when an Icon is rendered without a `type` prop.
registerCustomIconType("ionicon", Ionicons);
registerCustomIconType("feather", Feather);
registerCustomIconType("material-design", MaterialDesignIcons);
registerCustomIconType("material", MaterialIcons);

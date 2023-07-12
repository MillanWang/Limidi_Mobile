# GoToMarket Steps

## DONE

- x

## TODO

- DATA
  - Datastore getting more efficient. Separating out the slices for notes, color, and CC
  - Emergency backing-store reset upon load failure
- MENU
  - Shrinking down maximum grid size. Choosing maximums
  - Note octave level as a |-|number|+| section instead of a slider
  - Tabbed header to replace buttons
- GRID
  - Grid edit mode - Element info indication.
    - CC/Note
    - isLocked Icons
- CONTROL CHANGE
  - Debouncing/throttling of api calls
  - CC elem color reflecting the level when pressed. Color when single. Color+HexagonTexture when XY
  - CC port selection
  - CC port uniqueness warning
  - CC icon selection
  - CC vertical/horizontal/XY selection
- SCALES
  - Add more musical scales. Japanese, pentatonic, hamonic, melodic, etc.
  - Add FL studio FPC default for 4 column
  - Improve scale selector component
  - "Dirty" indicator when user deviates away from scale default
- COLOR
  - Elemental color selector
  - Color preset selector
  - Improve color themes
- NETWORKING
  - QR Code scanning of desktop app to get IP addy and port. Easy-to-type alternative when no camera permission is granted
  - Mobile error message system for lost connection with desktop
  - Sanitization of networking values
- DESKTOP APP
  - Windows desktop app that wraps around IIS. Maybe even websocket impl?
  - MacOS desktop port
- BUGS
  - BUG - Windows IIS randomly throws errors from IIS
  - BUG - The faulty dependencies that throw dependabot alerts
- LAUNCH
  - Phone-sized screen testing and theme fitting
  - Free and paid version feature flag. Ad in element zero
  - Make android APK
  - Get onto android app store
  - Get onto apple app store
  - Host a website to download the platform specific desktop app

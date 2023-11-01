# GoToMarket Steps

## TODO

- DATA
  - Datastore getting more efficient. Separating out the slices for notes, color, and CC
  - Emergency backing-store reset upon load failure
- MENU
  - Shrinking down maximum grid size. Choosing maximums
  - Note octave level as a |-|number|+| section instead of a slider
  - Grid sizes controled with |-|number|+| section instead of a slider
  - Tabbed header to replace buttons
- GRID
  - Grid edit mode - Element info indication.
    - CC/Note
    - isLocked Icons
- CONTROL CHANGE
  - Debouncing/throttling of api calls
  - CC port uniqueness warning
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
  - Heartbeat ping system to maintain stable connection
  - Sanitization of networking values from QR codes
- DESKTOP APP
  - Windows desktop app that wraps around IIS. Maybe even websocket impl?
  - MacOS desktop port
- BUGS
  - BUG - The faulty dependencies that throw dependabot alerts
- LAUNCH
  - Phone-sized screen testing and theme fitting
  - Free and paid version feature flag. Ad in element zero
  - Make android APK
  - Get onto android app store
  - Get onto apple app store
  - Host a website to download the platform specific desktop app

## DONE

- DATA
- MENU
- GRID
  - CC port selection
  - CC icon selection
  - CC vertical/horizontal/XY selection
  - CC elem color reflecting the level when pressed. Color when single. Color+HexagonTexture when XY
- CONTROL CHANGE
- SCALES
- COLOR
- NETWORKING
  - Generating QR codes from desktop app
- DESKTOP APP
- BUGS
- LAUNCH

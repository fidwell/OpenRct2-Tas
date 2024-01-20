# OpenRCT2 TAS

A [tool-assisted speedrun](https://en.wikipedia.org/wiki/Tool-assisted_speedrun) (TAS) script for OpenRCT2. It uses game actions to achieve scenario goals in as few ticks as possible.

## Scenarios

### Completed scenarios

| Scenario | Record |
| -------- | ----- |
| Hydro Hills | 16,384 ticks |
| Mineral Park | 18,023 ticks |
| Dark Age - Robin Hood | 16,384 ticks |
| Roaring Twenties - Schneider Cup | 529 ticks |
| Mythological - Cradle of Civilization | 2,643 ticks |
| Rock 'n' Roll - Rock 'n' Roll | 2,643 ticks |

### Other notes

Six Flags Magic Mountain is currently not TASable. The typical strategy for completing this scenario requires using an exploit where the game calculated park value _before_ it realized that deleted rides should have been deducted from that value. This was fixed sometime after 0.4.0, but since this TAS plugin requires speed-up features introduced in a later version, it can't be used.

## Installation and use

- This plugin requires OpenRCT2 version 0.4.6-e17bca3 or later.
- Download the latest version of the plugin from the [Releases](https://github.com/fidwell/OpenRct2-Tas/releases) page.
- Put the downloaded `TAS.js` file into your `/OpenRCT2/plugin` folder.
- For best real-time results, move all other plugins to a backup folder. (They slow down the game if you care about real-time timing.)
- When you load any supported scenario, the TAS run will automatically start.
- Upon scenario completion, a park message will appear with the real-time and tick count.

## Developer information

### Building the source code

- Install the latest version of [Node](https://nodejs.org/en/) and include NPM in the installation options.
- Clone the project to a location of your choice on your PC.
- Open a command prompt, use `cd` to change your current directory to the root folder of this project, and run `npm install`.
- Find the `openrct2.d.ts` TypeScript API declaration file in OpenRCT2's files and copy it to the `lib` folder. (This file can usually be found in `C:/Users/<YOUR NAME>/Documents/OpenRCT2/bin/` or `C:/Program Files/OpenRCT2/`).
  - Alternatively, you can make a symbolic link instead of copying the file, which will keep the file up to date whenever you install new versions of OpenRCT2.
- Run `npm run build` (for the release build) or `npm run build:dev` (develop build) to build the project.
  - For the release build, the default output folder is `(project directory)/dist`.
  - For the develop build, the project tries to put the plugin into your game's plugin directory.
  - These output paths can be changed in `rollup.config.js`.

### Hot reload

This project supports the [OpenRCT2 hot reload feature](https://github.com/OpenRCT2/OpenRCT2/blob/master/distribution/scripting.md#writing-scripts) for development.

- Make sure you've enabled it by setting `enable_hot_reloading = true` in your `/OpenRCT2/config.ini` file.
- Open a command prompt and use `cd` to change your current directory to the root folder of this project. (Or, open a terminal in an editor like Visual Studio Code.)
- Run `npm start` to start the hot reload server.
- Use the `/OpenRCT2/bin/openrct2.com` executable to start OpenRCT2 with the console.
- Each time you save any of the files in `./src/`, the server will compile `./src/plugin.ts` and place the compiled plugin file inside your local OpenRCT2 plugin directory.
- OpenRCT2 will notice file changes and will reload the plugin.

## Special thanks

- Basssiiie — TypeScript boilerplate and README text
- ceaselessly, Specky, lordmarcel, HeyThereImDad — Speedrunning strategies

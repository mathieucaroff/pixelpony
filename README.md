# Pixel Pony

An open-source clone of Pony Town

## Developer setup

If you've never used yarn before:

```sh
npm install -g yarn
```

In any case:

```sh
git clone ...
cd ...
yarn install # installs most notably lerna
yarn lerna boostrap # download dependencies and link local packages
cp -r ide/vscode .vscode # enable the VSCode shared configurations
```

Then, in VSCode:

- Use Ctrl+P to bring up the quickOpen bar (if you've not reattributed the "workbench.action.quickOpen" action). The text field should not contain any `>` at the beginning.
- In the quickOpen bar, type "task all", and select "pixelpony:build watch all".
- Then, in the quickOpen bar, type "task dev", and select "npm:dev".
- Then, in the quickOpen bar, type "debug re", and select "attach and
  auto-re-attach". Then type "nodemon" to narrow the displayed processes to
  only a handful. If there are only two, you can normally select any. If there
  are more, narrow more by adding the words "script", "dist" and (in the worst
  case scenario) "inspect" and "script.js"

Note about the VSCode configuration:

- The "task" commands are configured in `.vscode/tasks.json`
- The "debug" commands are configured in `.vscode/launch.json`

Note for pure command line users:

The tasks run in VSCode can also be run in the command line:

- Build watch the client: `yarn build:client:watch`
- Build watch the script package: `cd package/script && yarn tsc --watch`
  - The server is referenced from the script package, so it'll be built by tsc
    all along.
- Have nodemon run the server: `yarn dev`

...and if you don't want to use the VSCode debugger, Chrome has one which can connect to nodejs, just like VSCode.

## Structure

- `package/client`
- `package/server`
- `package/shared` - Code common to the client and the server. Mostly types.
- `package/script` - Code tying the client to the server and running the
  server. Not published on npm.

## Code

To understand the uncommon terms used in the project, read [the terminology file.](TERMINOLOGY.md)

## License

ISC License

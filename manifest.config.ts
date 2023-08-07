import { defineManifest } from 'vite-plugin-mongo-crx'
// @ts-ignore
import packageJson from './package.json'

const { version, name } = packageJson
// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = '0'] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, '')
  // split into version parts
  .split(/[.-]/)

export default defineManifest(async (env) => ({
  name: env.mode === 'staging' ? `[INTERNAL] ${name}` : name,
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  manifest_version: 3,
  // key: 'ekgmcbpgglflmgcfajnglpbcbdccnnje',
  icons: {
    16: 'src/assets/icons/small.png',
    32: 'src/assets/icons/normal.png',
    48: 'src/assets/icons/middle.png',
    128: 'src/assets/icons/large.png',
  },
  action: {
    default_popup: 'popup.html',
  },
  background: {
    service_worker: 'src/background/index.ts',
  },
  content_scripts: [
    {
      all_frames: false,
      js: [
        'src/content-script/csdn/blog/index.ts',
        'src/content-script/csdn/blog/copy.ts',
      ],
      matches: ['*://blog.csdn.net/*'],
      run_at: 'document_end',
    },
  ],
  host_permissions: ['*://*/*'],
  options_page: 'options.html',
  permissions: [
    'storage',
    'activeTab',
    'identity',
    'contextMenus',
    'clipboardWrite',
    'notifications',
  ],
  web_accessible_resources: [],
}))

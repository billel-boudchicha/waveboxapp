const Model = require('../Model')

class CRExtensionManifestContentScript extends Model {
  /* **************************************************************************/
  // Properties
  /* **************************************************************************/

  get matches () { return this._value_('matches', []) }
  get js () {
    return this._value_('js', [])
      .map((value) => value ? this._sanitizePathValue_(value) : undefined)
      .filter((value) => !!value)
  }
  get runAt () { return this._value_('run_at', 'document_idle') }
}

module.exports = CRExtensionManifestContentScript

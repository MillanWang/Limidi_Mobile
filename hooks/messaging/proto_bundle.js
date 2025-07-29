/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MidiNote = (function () {
  /**
   * Properties of a MidiNote.
   * @exports IMidiNote
   * @interface IMidiNote
   * @property {number|null} [noteNumber] MidiNote noteNumber
   * @property {number|null} [velocity] MidiNote velocity
   * @property {boolean|null} [isNoteOn] MidiNote isNoteOn
   */

  /**
   * Constructs a new MidiNote.
   * @exports MidiNote
   * @classdesc Represents a MidiNote.
   * @implements IMidiNote
   * @constructor
   * @param {IMidiNote=} [properties] Properties to set
   */
  function MidiNote(properties) {
    if (properties)
      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * MidiNote noteNumber.
   * @member {number} noteNumber
   * @memberof MidiNote
   * @instance
   */
  MidiNote.prototype.noteNumber = 0;

  /**
   * MidiNote velocity.
   * @member {number} velocity
   * @memberof MidiNote
   * @instance
   */
  MidiNote.prototype.velocity = 0;

  /**
   * MidiNote isNoteOn.
   * @member {boolean} isNoteOn
   * @memberof MidiNote
   * @instance
   */
  MidiNote.prototype.isNoteOn = false;

  /**
   * Creates a new MidiNote instance using the specified properties.
   * @function create
   * @memberof MidiNote
   * @static
   * @param {IMidiNote=} [properties] Properties to set
   * @returns {MidiNote} MidiNote instance
   */
  MidiNote.create = function create(properties) {
    return new MidiNote(properties);
  };

  /**
   * Encodes the specified MidiNote message. Does not implicitly {@link MidiNote.verify|verify} messages.
   * @function encode
   * @memberof MidiNote
   * @static
   * @param {IMidiNote} message MidiNote message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  MidiNote.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (
      message.noteNumber != null &&
      Object.hasOwnProperty.call(message, "noteNumber")
    )
      writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.noteNumber);
    if (
      message.velocity != null &&
      Object.hasOwnProperty.call(message, "velocity")
    )
      writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.velocity);
    if (
      message.isNoteOn != null &&
      Object.hasOwnProperty.call(message, "isNoteOn")
    )
      writer.uint32(/* id 3, wireType 0 =*/ 24).bool(message.isNoteOn);
    return writer;
  };

  /**
   * Encodes the specified MidiNote message, length delimited. Does not implicitly {@link MidiNote.verify|verify} messages.
   * @function encodeDelimited
   * @memberof MidiNote
   * @static
   * @param {IMidiNote} message MidiNote message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  MidiNote.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

  /**
   * Decodes a MidiNote message from the specified reader or buffer.
   * @function decode
   * @memberof MidiNote
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {MidiNote} MidiNote
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  MidiNote.decode = function decode(reader, length, error) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    var end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.MidiNote();
    while (reader.pos < end) {
      var tag = reader.uint32();
      if (tag === error) break;
      switch (tag >>> 3) {
        case 1: {
          message.noteNumber = reader.int32();
          break;
        }
        case 2: {
          message.velocity = reader.int32();
          break;
        }
        case 3: {
          message.isNoteOn = reader.bool();
          break;
        }
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  /**
   * Decodes a MidiNote message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof MidiNote
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {MidiNote} MidiNote
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  MidiNote.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies a MidiNote message.
   * @function verify
   * @memberof MidiNote
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  MidiNote.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected";
    if (message.noteNumber != null && message.hasOwnProperty("noteNumber"))
      if (!$util.isInteger(message.noteNumber))
        return "noteNumber: integer expected";
    if (message.velocity != null && message.hasOwnProperty("velocity"))
      if (!$util.isInteger(message.velocity))
        return "velocity: integer expected";
    if (message.isNoteOn != null && message.hasOwnProperty("isNoteOn"))
      if (typeof message.isNoteOn !== "boolean")
        return "isNoteOn: boolean expected";
    return null;
  };

  /**
   * Creates a MidiNote message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof MidiNote
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {MidiNote} MidiNote
   */
  MidiNote.fromObject = function fromObject(object) {
    if (object instanceof $root.MidiNote) return object;
    var message = new $root.MidiNote();
    if (object.noteNumber != null) message.noteNumber = object.noteNumber | 0;
    if (object.velocity != null) message.velocity = object.velocity | 0;
    if (object.isNoteOn != null) message.isNoteOn = Boolean(object.isNoteOn);
    return message;
  };

  /**
   * Creates a plain object from a MidiNote message. Also converts values to other types if specified.
   * @function toObject
   * @memberof MidiNote
   * @static
   * @param {MidiNote} message MidiNote
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  MidiNote.toObject = function toObject(message, options) {
    if (!options) options = {};
    var object = {};
    if (options.defaults) {
      object.noteNumber = 0;
      object.velocity = 0;
      object.isNoteOn = false;
    }
    if (message.noteNumber != null && message.hasOwnProperty("noteNumber"))
      object.noteNumber = message.noteNumber;
    if (message.velocity != null && message.hasOwnProperty("velocity"))
      object.velocity = message.velocity;
    if (message.isNoteOn != null && message.hasOwnProperty("isNoteOn"))
      object.isNoteOn = message.isNoteOn;
    return object;
  };

  /**
   * Converts this MidiNote to JSON.
   * @function toJSON
   * @memberof MidiNote
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  MidiNote.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  /**
   * Gets the default type url for MidiNote
   * @function getTypeUrl
   * @memberof MidiNote
   * @static
   * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns {string} The default type url
   */
  MidiNote.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
    if (typeUrlPrefix === undefined) {
      typeUrlPrefix = "type.googleapis.com";
    }
    return typeUrlPrefix + "/MidiNote";
  };

  return MidiNote;
})();

$root.ControlChange = (function () {
  /**
   * Properties of a ControlChange.
   * @exports IControlChange
   * @interface IControlChange
   * @property {number|null} [controlIndex] ControlChange controlIndex
   * @property {number|null} [level] ControlChange level
   */

  /**
   * Constructs a new ControlChange.
   * @exports ControlChange
   * @classdesc Represents a ControlChange.
   * @implements IControlChange
   * @constructor
   * @param {IControlChange=} [properties] Properties to set
   */
  function ControlChange(properties) {
    if (properties)
      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * ControlChange controlIndex.
   * @member {number} controlIndex
   * @memberof ControlChange
   * @instance
   */
  ControlChange.prototype.controlIndex = 0;

  /**
   * ControlChange level.
   * @member {number} level
   * @memberof ControlChange
   * @instance
   */
  ControlChange.prototype.level = 0;

  /**
   * Creates a new ControlChange instance using the specified properties.
   * @function create
   * @memberof ControlChange
   * @static
   * @param {IControlChange=} [properties] Properties to set
   * @returns {ControlChange} ControlChange instance
   */
  ControlChange.create = function create(properties) {
    return new ControlChange(properties);
  };

  /**
   * Encodes the specified ControlChange message. Does not implicitly {@link ControlChange.verify|verify} messages.
   * @function encode
   * @memberof ControlChange
   * @static
   * @param {IControlChange} message ControlChange message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  ControlChange.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (
      message.controlIndex != null &&
      Object.hasOwnProperty.call(message, "controlIndex")
    )
      writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.controlIndex);
    if (message.level != null && Object.hasOwnProperty.call(message, "level"))
      writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.level);
    return writer;
  };

  /**
   * Encodes the specified ControlChange message, length delimited. Does not implicitly {@link ControlChange.verify|verify} messages.
   * @function encodeDelimited
   * @memberof ControlChange
   * @static
   * @param {IControlChange} message ControlChange message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  ControlChange.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

  /**
   * Decodes a ControlChange message from the specified reader or buffer.
   * @function decode
   * @memberof ControlChange
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {ControlChange} ControlChange
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  ControlChange.decode = function decode(reader, length, error) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    var end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.ControlChange();
    while (reader.pos < end) {
      var tag = reader.uint32();
      if (tag === error) break;
      switch (tag >>> 3) {
        case 1: {
          message.controlIndex = reader.int32();
          break;
        }
        case 2: {
          message.level = reader.int32();
          break;
        }
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  /**
   * Decodes a ControlChange message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof ControlChange
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {ControlChange} ControlChange
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  ControlChange.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies a ControlChange message.
   * @function verify
   * @memberof ControlChange
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  ControlChange.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected";
    if (message.controlIndex != null && message.hasOwnProperty("controlIndex"))
      if (!$util.isInteger(message.controlIndex))
        return "controlIndex: integer expected";
    if (message.level != null && message.hasOwnProperty("level"))
      if (!$util.isInteger(message.level)) return "level: integer expected";
    return null;
  };

  /**
   * Creates a ControlChange message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof ControlChange
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {ControlChange} ControlChange
   */
  ControlChange.fromObject = function fromObject(object) {
    if (object instanceof $root.ControlChange) return object;
    var message = new $root.ControlChange();
    if (object.controlIndex != null)
      message.controlIndex = object.controlIndex | 0;
    if (object.level != null) message.level = object.level | 0;
    return message;
  };

  /**
   * Creates a plain object from a ControlChange message. Also converts values to other types if specified.
   * @function toObject
   * @memberof ControlChange
   * @static
   * @param {ControlChange} message ControlChange
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  ControlChange.toObject = function toObject(message, options) {
    if (!options) options = {};
    var object = {};
    if (options.defaults) {
      object.controlIndex = 0;
      object.level = 0;
    }
    if (message.controlIndex != null && message.hasOwnProperty("controlIndex"))
      object.controlIndex = message.controlIndex;
    if (message.level != null && message.hasOwnProperty("level"))
      object.level = message.level;
    return object;
  };

  /**
   * Converts this ControlChange to JSON.
   * @function toJSON
   * @memberof ControlChange
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  ControlChange.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  /**
   * Gets the default type url for ControlChange
   * @function getTypeUrl
   * @memberof ControlChange
   * @static
   * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns {string} The default type url
   */
  ControlChange.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
    if (typeUrlPrefix === undefined) {
      typeUrlPrefix = "type.googleapis.com";
    }
    return typeUrlPrefix + "/ControlChange";
  };

  return ControlChange;
})();

$root.WrapperMessage = (function () {
  /**
   * Properties of a WrapperMessage.
   * @exports IWrapperMessage
   * @interface IWrapperMessage
   * @property {IMidiNote|null} [midiNote] WrapperMessage midiNote
   * @property {IControlChange|null} [controlChange] WrapperMessage controlChange
   */

  /**
   * Constructs a new WrapperMessage.
   * @exports WrapperMessage
   * @classdesc Represents a WrapperMessage.
   * @implements IWrapperMessage
   * @constructor
   * @param {IWrapperMessage=} [properties] Properties to set
   */
  function WrapperMessage(properties) {
    if (properties)
      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * WrapperMessage midiNote.
   * @member {IMidiNote|null|undefined} midiNote
   * @memberof WrapperMessage
   * @instance
   */
  WrapperMessage.prototype.midiNote = null;

  /**
   * WrapperMessage controlChange.
   * @member {IControlChange|null|undefined} controlChange
   * @memberof WrapperMessage
   * @instance
   */
  WrapperMessage.prototype.controlChange = null;

  // OneOf field names bound to virtual getters and setters
  var $oneOfFields;

  /**
   * WrapperMessage payload.
   * @member {"midiNote"|"controlChange"|undefined} payload
   * @memberof WrapperMessage
   * @instance
   */
  Object.defineProperty(WrapperMessage.prototype, "payload", {
    get: $util.oneOfGetter(($oneOfFields = ["midiNote", "controlChange"])),
    set: $util.oneOfSetter($oneOfFields),
  });

  /**
   * Creates a new WrapperMessage instance using the specified properties.
   * @function create
   * @memberof WrapperMessage
   * @static
   * @param {IWrapperMessage=} [properties] Properties to set
   * @returns {WrapperMessage} WrapperMessage instance
   */
  WrapperMessage.create = function create(properties) {
    return new WrapperMessage(properties);
  };

  /**
   * Encodes the specified WrapperMessage message. Does not implicitly {@link WrapperMessage.verify|verify} messages.
   * @function encode
   * @memberof WrapperMessage
   * @static
   * @param {IWrapperMessage} message WrapperMessage message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  WrapperMessage.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (
      message.midiNote != null &&
      Object.hasOwnProperty.call(message, "midiNote")
    )
      $root.MidiNote.encode(
        message.midiNote,
        writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
      ).ldelim();
    if (
      message.controlChange != null &&
      Object.hasOwnProperty.call(message, "controlChange")
    )
      $root.ControlChange.encode(
        message.controlChange,
        writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
      ).ldelim();
    return writer;
  };

  /**
   * Encodes the specified WrapperMessage message, length delimited. Does not implicitly {@link WrapperMessage.verify|verify} messages.
   * @function encodeDelimited
   * @memberof WrapperMessage
   * @static
   * @param {IWrapperMessage} message WrapperMessage message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  WrapperMessage.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

  /**
   * Decodes a WrapperMessage message from the specified reader or buffer.
   * @function decode
   * @memberof WrapperMessage
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {WrapperMessage} WrapperMessage
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  WrapperMessage.decode = function decode(reader, length, error) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    var end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.WrapperMessage();
    while (reader.pos < end) {
      var tag = reader.uint32();
      if (tag === error) break;
      switch (tag >>> 3) {
        case 1: {
          message.midiNote = $root.MidiNote.decode(reader, reader.uint32());
          break;
        }
        case 2: {
          message.controlChange = $root.ControlChange.decode(
            reader,
            reader.uint32()
          );
          break;
        }
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  /**
   * Decodes a WrapperMessage message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof WrapperMessage
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {WrapperMessage} WrapperMessage
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  WrapperMessage.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies a WrapperMessage message.
   * @function verify
   * @memberof WrapperMessage
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  WrapperMessage.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected";
    var properties = {};
    if (message.midiNote != null && message.hasOwnProperty("midiNote")) {
      properties.payload = 1;
      {
        var error = $root.MidiNote.verify(message.midiNote);
        if (error) return "midiNote." + error;
      }
    }
    if (
      message.controlChange != null &&
      message.hasOwnProperty("controlChange")
    ) {
      if (properties.payload === 1) return "payload: multiple values";
      properties.payload = 1;
      {
        var error = $root.ControlChange.verify(message.controlChange);
        if (error) return "controlChange." + error;
      }
    }
    return null;
  };

  /**
   * Creates a WrapperMessage message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof WrapperMessage
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {WrapperMessage} WrapperMessage
   */
  WrapperMessage.fromObject = function fromObject(object) {
    if (object instanceof $root.WrapperMessage) return object;
    var message = new $root.WrapperMessage();
    if (object.midiNote != null) {
      if (typeof object.midiNote !== "object")
        throw TypeError(".WrapperMessage.midiNote: object expected");
      message.midiNote = $root.MidiNote.fromObject(object.midiNote);
    }
    if (object.controlChange != null) {
      if (typeof object.controlChange !== "object")
        throw TypeError(".WrapperMessage.controlChange: object expected");
      message.controlChange = $root.ControlChange.fromObject(
        object.controlChange
      );
    }
    return message;
  };

  /**
   * Creates a plain object from a WrapperMessage message. Also converts values to other types if specified.
   * @function toObject
   * @memberof WrapperMessage
   * @static
   * @param {WrapperMessage} message WrapperMessage
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  WrapperMessage.toObject = function toObject(message, options) {
    if (!options) options = {};
    var object = {};
    if (message.midiNote != null && message.hasOwnProperty("midiNote")) {
      object.midiNote = $root.MidiNote.toObject(message.midiNote, options);
      if (options.oneofs) object.payload = "midiNote";
    }
    if (
      message.controlChange != null &&
      message.hasOwnProperty("controlChange")
    ) {
      object.controlChange = $root.ControlChange.toObject(
        message.controlChange,
        options
      );
      if (options.oneofs) object.payload = "controlChange";
    }
    return object;
  };

  /**
   * Converts this WrapperMessage to JSON.
   * @function toJSON
   * @memberof WrapperMessage
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  WrapperMessage.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  /**
   * Gets the default type url for WrapperMessage
   * @function getTypeUrl
   * @memberof WrapperMessage
   * @static
   * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns {string} The default type url
   */
  WrapperMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
    if (typeUrlPrefix === undefined) {
      typeUrlPrefix = "type.googleapis.com";
    }
    return typeUrlPrefix + "/WrapperMessage";
  };

  return WrapperMessage;
})();

module.exports = $root;

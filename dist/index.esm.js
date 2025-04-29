var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
        return Reflect.construct(f, arguments, this.constructor);
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var Roarr = {};

var createLogger = {};

var config$1 = {};

var hasRequiredConfig;

function requireConfig () {
	if (hasRequiredConfig) return config$1;
	hasRequiredConfig = 1;
	Object.defineProperty(config$1, "__esModule", { value: true });
	config$1.ROARR_LOG_FORMAT_VERSION = config$1.ROARR_VERSION = void 0;
	// This needs to be updated manually because there is no way
	// to know the package version at the build time.
	config$1.ROARR_VERSION = '5.0.0';
	config$1.ROARR_LOG_FORMAT_VERSION = '2.0.0';
	
	return config$1;
}

var constants = {};

var hasRequiredConstants;

function requireConstants () {
	if (hasRequiredConstants) return constants;
	hasRequiredConstants = 1;
	Object.defineProperty(constants, "__esModule", { value: true });
	constants.logLevels = void 0;
	constants.logLevels = {
	    debug: 20,
	    error: 50,
	    fatal: 60,
	    info: 30,
	    trace: 10,
	    warn: 40,
	};
	
	return constants;
}

var hasOwnProperty = {};

var hasRequiredHasOwnProperty;

function requireHasOwnProperty () {
	if (hasRequiredHasOwnProperty) return hasOwnProperty;
	hasRequiredHasOwnProperty = 1;
	Object.defineProperty(hasOwnProperty, "__esModule", { value: true });
	hasOwnProperty.hasOwnProperty = void 0;
	/**
	 * A stricter type guard.
	 * @see https://tsplay.dev/WK8zGw
	 */
	const hasOwnProperty$1 = (object, property) => {
	    return Object.prototype.hasOwnProperty.call(object, property);
	};
	hasOwnProperty.hasOwnProperty = hasOwnProperty$1;
	
	return hasOwnProperty;
}

var isBrowser = {};

var hasRequiredIsBrowser;

function requireIsBrowser () {
	if (hasRequiredIsBrowser) return isBrowser;
	hasRequiredIsBrowser = 1;
	Object.defineProperty(isBrowser, "__esModule", { value: true });
	isBrowser.isBrowser = void 0;
	const isBrowser$1 = () => typeof window !== 'undefined';
	isBrowser.isBrowser = isBrowser$1;
	
	return isBrowser;
}

var isTruthy = {};

var hasRequiredIsTruthy;

function requireIsTruthy () {
	if (hasRequiredIsTruthy) return isTruthy;
	hasRequiredIsTruthy = 1;
	Object.defineProperty(isTruthy, "__esModule", { value: true });
	isTruthy.isTruthy = void 0;
	const isTruthy$1 = (value) => {
	    return ['true', 't', 'yes', 'y', 'on', '1'].includes(value.trim().toLowerCase());
	};
	isTruthy.isTruthy = isTruthy$1;
	
	return isTruthy;
}

var createMockLogger = {};

var hasRequiredCreateMockLogger;

function requireCreateMockLogger () {
	if (hasRequiredCreateMockLogger) return createMockLogger;
	hasRequiredCreateMockLogger = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.createMockLogger = void 0;
		const constants_1 = requireConstants();
		const createChildLogger = (log, logLevel) => {
		    return (a, b, c, d, e, f, g, h, index, index_) => {
		        log.child({
		            logLevel,
		        })(a, b, c, d, e, f, g, h, index, index_);
		    };
		};
		const createMockLogger = (onMessage, parentContext) => {
		    // eslint-disable-next-line unicorn/consistent-function-scoping
		    const log = () => {
		        return undefined;
		    };
		    log.adopt = async (routine) => {
		        return routine();
		    };
		    log.child = () => {
		        return (0, exports.createMockLogger)(onMessage, parentContext);
		    };
		    log.getContext = () => {
		        return {};
		    };
		    log.debug = createChildLogger(log, constants_1.logLevels.debug);
		    log.debugOnce = createChildLogger(log, constants_1.logLevels.debug);
		    log.error = createChildLogger(log, constants_1.logLevels.error);
		    log.errorOnce = createChildLogger(log, constants_1.logLevels.error);
		    log.fatal = createChildLogger(log, constants_1.logLevels.fatal);
		    log.fatalOnce = createChildLogger(log, constants_1.logLevels.fatal);
		    log.info = createChildLogger(log, constants_1.logLevels.info);
		    log.infoOnce = createChildLogger(log, constants_1.logLevels.info);
		    log.trace = createChildLogger(log, constants_1.logLevels.trace);
		    log.traceOnce = createChildLogger(log, constants_1.logLevels.trace);
		    log.warn = createChildLogger(log, constants_1.logLevels.warn);
		    log.warnOnce = createChildLogger(log, constants_1.logLevels.warn);
		    return log;
		};
		exports.createMockLogger = createMockLogger;
		
	} (createMockLogger));
	return createMockLogger;
}

var printf = {};

var createPrintf = {};

var boolean$1 = {};

var hasRequiredBoolean$1;

function requireBoolean$1 () {
	if (hasRequiredBoolean$1) return boolean$1;
	hasRequiredBoolean$1 = 1;
	Object.defineProperty(boolean$1, "__esModule", { value: true });
	boolean$1.boolean = void 0;
	/**
	 * Copy function from deprecated `boolean` npm package v3.2.0 to avoid breaking changes.
	 *
	 * @see https://www.npmjs.com/package/boolean?activeTab=code
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- any from source `boolean` package v3.2.0
	const boolean = function (value) {
	    switch (Object.prototype.toString.call(value)) {
	        case '[object String]':
	            return ['true', 't', 'yes', 'y', 'on', '1'].includes(value.trim().toLowerCase());
	        case '[object Number]':
	            return value.valueOf() === 1;
	        case '[object Boolean]':
	            return value.valueOf();
	        default:
	            return false;
	    }
	};
	boolean$1.boolean = boolean;
	return boolean$1;
}

var tokenize = {};

var hasRequiredTokenize;

function requireTokenize () {
	if (hasRequiredTokenize) return tokenize;
	hasRequiredTokenize = 1;
	Object.defineProperty(tokenize, "__esModule", { value: true });
	tokenize.tokenize = void 0;
	const TokenRule = /(?:%(?<flag>([+0-]|-\+))?(?<width>\d+)?(?<position>\d+\$)?(?<precision>\.\d+)?(?<conversion>[%BCESb-iosux]))|(\\%)/g;
	const tokenize$1 = (subject) => {
	    let matchResult;
	    const tokens = [];
	    let argumentIndex = 0;
	    let lastIndex = 0;
	    let lastToken = null;
	    while ((matchResult = TokenRule.exec(subject)) !== null) {
	        if (matchResult.index > lastIndex) {
	            lastToken = {
	                literal: subject.slice(lastIndex, matchResult.index),
	                type: 'literal',
	            };
	            tokens.push(lastToken);
	        }
	        const match = matchResult[0];
	        lastIndex = matchResult.index + match.length;
	        if (match === '\\%' || match === '%%') {
	            if (lastToken && lastToken.type === 'literal') {
	                lastToken.literal += '%';
	            }
	            else {
	                lastToken = {
	                    literal: '%',
	                    type: 'literal',
	                };
	                tokens.push(lastToken);
	            }
	        }
	        else if (matchResult.groups) {
	            lastToken = {
	                conversion: matchResult.groups.conversion,
	                // eslint-disable-next-line @typescript-eslint/no-explicit-any -- intentional per @gajus
	                flag: matchResult.groups.flag || null,
	                placeholder: match,
	                position: matchResult.groups.position ? Number.parseInt(matchResult.groups.position, 10) - 1 : argumentIndex++,
	                precision: matchResult.groups.precision ? Number.parseInt(matchResult.groups.precision.slice(1), 10) : null,
	                type: 'placeholder',
	                width: matchResult.groups.width ? Number.parseInt(matchResult.groups.width, 10) : null,
	            };
	            tokens.push(lastToken);
	        }
	    }
	    if (lastIndex <= subject.length - 1) {
	        if (lastToken && lastToken.type === 'literal') {
	            lastToken.literal += subject.slice(lastIndex);
	        }
	        else {
	            tokens.push({
	                literal: subject.slice(lastIndex),
	                type: 'literal',
	            });
	        }
	    }
	    return tokens;
	};
	tokenize.tokenize = tokenize$1;
	return tokenize;
}

var hasRequiredCreatePrintf;

function requireCreatePrintf () {
	if (hasRequiredCreatePrintf) return createPrintf;
	hasRequiredCreatePrintf = 1;
	Object.defineProperty(createPrintf, "__esModule", { value: true });
	createPrintf.createPrintf = void 0;
	const boolean_1 = requireBoolean$1();
	const tokenize_1 = requireTokenize();
	const formatDefaultUnboundExpression = (_subject, token) => {
	    return token.placeholder;
	};
	const createPrintf$1 = (configuration) => {
	    var _a;
	    // eslint-disable-next-line unicorn/consistent-function-scoping -- intentional per @gajus
	    const padValue = (value, width, flag) => {
	        if (flag === '-') {
	            return value.padEnd(width, ' ');
	        }
	        else if (flag === '-+') {
	            return ((Number(value) >= 0 ? '+' : '') + value).padEnd(width, ' ');
	        }
	        else if (flag === '+') {
	            return ((Number(value) >= 0 ? '+' : '') + value).padStart(width, ' ');
	        }
	        else if (flag === '0') {
	            return value.padStart(width, '0');
	        }
	        else {
	            return value.padStart(width, ' ');
	        }
	    };
	    const formatUnboundExpression = (_a = configuration === null || configuration === void 0 ? void 0 : configuration.formatUnboundExpression) !== null && _a !== void 0 ? _a : formatDefaultUnboundExpression;
	    const cache = {};
	    // eslint-disable-next-line complexity
	    return (subject, ...boundValues) => {
	        let tokens = cache[subject];
	        if (!tokens) {
	            tokens = cache[subject] = (0, tokenize_1.tokenize)(subject);
	        }
	        let result = '';
	        for (const token of tokens) {
	            if (token.type === 'literal') {
	                result += token.literal;
	            }
	            else {
	                let boundValue = boundValues[token.position];
	                if (boundValue === undefined) {
	                    result += formatUnboundExpression(subject, token, boundValues);
	                }
	                else if (token.conversion === 'b') {
	                    result += (0, boolean_1.boolean)(boundValue) ? 'true' : 'false';
	                }
	                else if (token.conversion === 'B') {
	                    result += (0, boolean_1.boolean)(boundValue) ? 'TRUE' : 'FALSE';
	                }
	                else if (token.conversion === 'c') {
	                    result += boundValue;
	                }
	                else if (token.conversion === 'C') {
	                    result += String(boundValue).toUpperCase();
	                }
	                else if (token.conversion === 'i' || token.conversion === 'd') {
	                    boundValue = String(Math.trunc(boundValue));
	                    if (token.width !== null) {
	                        boundValue = padValue(boundValue, token.width, token.flag);
	                    }
	                    result += boundValue;
	                }
	                else if (token.conversion === 'e') {
	                    result += Number(boundValue)
	                        .toExponential();
	                }
	                else if (token.conversion === 'E') {
	                    result += Number(boundValue)
	                        .toExponential()
	                        .toUpperCase();
	                }
	                else if (token.conversion === 'f') {
	                    if (token.precision !== null) {
	                        boundValue = Number(boundValue).toFixed(token.precision);
	                    }
	                    if (token.width !== null) {
	                        boundValue = padValue(String(boundValue), token.width, token.flag);
	                    }
	                    result += boundValue;
	                }
	                else if (token.conversion === 'o') {
	                    result += (Number.parseInt(String(boundValue), 10) >>> 0).toString(8);
	                }
	                else if (token.conversion === 's') {
	                    if (token.width !== null) {
	                        boundValue = padValue(String(boundValue), token.width, token.flag);
	                    }
	                    result += boundValue;
	                }
	                else if (token.conversion === 'S') {
	                    if (token.width !== null) {
	                        boundValue = padValue(String(boundValue), token.width, token.flag);
	                    }
	                    result += String(boundValue).toUpperCase();
	                }
	                else if (token.conversion === 'u') {
	                    result += Number.parseInt(String(boundValue), 10) >>> 0;
	                }
	                else if (token.conversion === 'x') {
	                    boundValue = (Number.parseInt(String(boundValue), 10) >>> 0).toString(16);
	                    if (token.width !== null) {
	                        boundValue = padValue(String(boundValue), token.width, token.flag);
	                    }
	                    result += boundValue;
	                }
	                else {
	                    throw new Error('Unknown format specifier.');
	                }
	            }
	        }
	        return result;
	    };
	};
	createPrintf.createPrintf = createPrintf$1;
	return createPrintf;
}

var hasRequiredPrintf;

function requirePrintf () {
	if (hasRequiredPrintf) return printf;
	hasRequiredPrintf = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.printf = exports.createPrintf = void 0;
		const createPrintf_1 = requireCreatePrintf();
		Object.defineProperty(exports, "createPrintf", { enumerable: true, get: function () { return createPrintf_1.createPrintf; } });
		exports.printf = (0, createPrintf_1.createPrintf)(); 
	} (printf));
	return printf;
}

var safeStableStringify = {exports: {}};

var hasRequiredSafeStableStringify;

function requireSafeStableStringify () {
	if (hasRequiredSafeStableStringify) return safeStableStringify.exports;
	hasRequiredSafeStableStringify = 1;
	(function (module, exports) {

		const { hasOwnProperty } = Object.prototype;

		const stringify = configure();

		// @ts-expect-error
		stringify.configure = configure;
		// @ts-expect-error
		stringify.stringify = stringify;

		// @ts-expect-error
		stringify.default = stringify;

		// @ts-expect-error used for named export
		exports.stringify = stringify;
		// @ts-expect-error used for named export
		exports.configure = configure;

		module.exports = stringify;

		// eslint-disable-next-line no-control-regex
		const strEscapeSequencesRegExp = /[\u0000-\u001f\u0022\u005c\ud800-\udfff]/;

		// Escape C0 control characters, double quotes, the backslash and every code
		// unit with a numeric value in the inclusive range 0xD800 to 0xDFFF.
		function strEscape (str) {
		  // Some magic numbers that worked out fine while benchmarking with v8 8.0
		  if (str.length < 5000 && !strEscapeSequencesRegExp.test(str)) {
		    return `"${str}"`
		  }
		  return JSON.stringify(str)
		}

		function sort (array, comparator) {
		  // Insertion sort is very efficient for small input sizes, but it has a bad
		  // worst case complexity. Thus, use native array sort for bigger values.
		  if (array.length > 2e2 || comparator) {
		    return array.sort(comparator)
		  }
		  for (let i = 1; i < array.length; i++) {
		    const currentValue = array[i];
		    let position = i;
		    while (position !== 0 && array[position - 1] > currentValue) {
		      array[position] = array[position - 1];
		      position--;
		    }
		    array[position] = currentValue;
		  }
		  return array
		}

		const typedArrayPrototypeGetSymbolToStringTag =
		  Object.getOwnPropertyDescriptor(
		    Object.getPrototypeOf(
		      Object.getPrototypeOf(
		        new Int8Array()
		      )
		    ),
		    Symbol.toStringTag
		  ).get;

		function isTypedArrayWithEntries (value) {
		  return typedArrayPrototypeGetSymbolToStringTag.call(value) !== undefined && value.length !== 0
		}

		function stringifyTypedArray (array, separator, maximumBreadth) {
		  if (array.length < maximumBreadth) {
		    maximumBreadth = array.length;
		  }
		  const whitespace = separator === ',' ? '' : ' ';
		  let res = `"0":${whitespace}${array[0]}`;
		  for (let i = 1; i < maximumBreadth; i++) {
		    res += `${separator}"${i}":${whitespace}${array[i]}`;
		  }
		  return res
		}

		function getCircularValueOption (options) {
		  if (hasOwnProperty.call(options, 'circularValue')) {
		    const circularValue = options.circularValue;
		    if (typeof circularValue === 'string') {
		      return `"${circularValue}"`
		    }
		    if (circularValue == null) {
		      return circularValue
		    }
		    if (circularValue === Error || circularValue === TypeError) {
		      return {
		        toString () {
		          throw new TypeError('Converting circular structure to JSON')
		        }
		      }
		    }
		    throw new TypeError('The "circularValue" argument must be of type string or the value null or undefined')
		  }
		  return '"[Circular]"'
		}

		function getDeterministicOption (options) {
		  let value;
		  if (hasOwnProperty.call(options, 'deterministic')) {
		    value = options.deterministic;
		    if (typeof value !== 'boolean' && typeof value !== 'function') {
		      throw new TypeError('The "deterministic" argument must be of type boolean or comparator function')
		    }
		  }
		  return value === undefined ? true : value
		}

		function getBooleanOption (options, key) {
		  let value;
		  if (hasOwnProperty.call(options, key)) {
		    value = options[key];
		    if (typeof value !== 'boolean') {
		      throw new TypeError(`The "${key}" argument must be of type boolean`)
		    }
		  }
		  return value === undefined ? true : value
		}

		function getPositiveIntegerOption (options, key) {
		  let value;
		  if (hasOwnProperty.call(options, key)) {
		    value = options[key];
		    if (typeof value !== 'number') {
		      throw new TypeError(`The "${key}" argument must be of type number`)
		    }
		    if (!Number.isInteger(value)) {
		      throw new TypeError(`The "${key}" argument must be an integer`)
		    }
		    if (value < 1) {
		      throw new RangeError(`The "${key}" argument must be >= 1`)
		    }
		  }
		  return value === undefined ? Infinity : value
		}

		function getItemCount (number) {
		  if (number === 1) {
		    return '1 item'
		  }
		  return `${number} items`
		}

		function getUniqueReplacerSet (replacerArray) {
		  const replacerSet = new Set();
		  for (const value of replacerArray) {
		    if (typeof value === 'string' || typeof value === 'number') {
		      replacerSet.add(String(value));
		    }
		  }
		  return replacerSet
		}

		function getStrictOption (options) {
		  if (hasOwnProperty.call(options, 'strict')) {
		    const value = options.strict;
		    if (typeof value !== 'boolean') {
		      throw new TypeError('The "strict" argument must be of type boolean')
		    }
		    if (value) {
		      return (value) => {
		        let message = `Object can not safely be stringified. Received type ${typeof value}`;
		        if (typeof value !== 'function') message += ` (${value.toString()})`;
		        throw new Error(message)
		      }
		    }
		  }
		}

		function configure (options) {
		  options = { ...options };
		  const fail = getStrictOption(options);
		  if (fail) {
		    if (options.bigint === undefined) {
		      options.bigint = false;
		    }
		    if (!('circularValue' in options)) {
		      options.circularValue = Error;
		    }
		  }
		  const circularValue = getCircularValueOption(options);
		  const bigint = getBooleanOption(options, 'bigint');
		  const deterministic = getDeterministicOption(options);
		  const comparator = typeof deterministic === 'function' ? deterministic : undefined;
		  const maximumDepth = getPositiveIntegerOption(options, 'maximumDepth');
		  const maximumBreadth = getPositiveIntegerOption(options, 'maximumBreadth');

		  function stringifyFnReplacer (key, parent, stack, replacer, spacer, indentation) {
		    let value = parent[key];

		    if (typeof value === 'object' && value !== null && typeof value.toJSON === 'function') {
		      value = value.toJSON(key);
		    }
		    value = replacer.call(parent, key, value);

		    switch (typeof value) {
		      case 'string':
		        return strEscape(value)
		      case 'object': {
		        if (value === null) {
		          return 'null'
		        }
		        if (stack.indexOf(value) !== -1) {
		          return circularValue
		        }

		        let res = '';
		        let join = ',';
		        const originalIndentation = indentation;

		        if (Array.isArray(value)) {
		          if (value.length === 0) {
		            return '[]'
		          }
		          if (maximumDepth < stack.length + 1) {
		            return '"[Array]"'
		          }
		          stack.push(value);
		          if (spacer !== '') {
		            indentation += spacer;
		            res += `\n${indentation}`;
		            join = `,\n${indentation}`;
		          }
		          const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
		          let i = 0;
		          for (; i < maximumValuesToStringify - 1; i++) {
		            const tmp = stringifyFnReplacer(String(i), value, stack, replacer, spacer, indentation);
		            res += tmp !== undefined ? tmp : 'null';
		            res += join;
		          }
		          const tmp = stringifyFnReplacer(String(i), value, stack, replacer, spacer, indentation);
		          res += tmp !== undefined ? tmp : 'null';
		          if (value.length - 1 > maximumBreadth) {
		            const removedKeys = value.length - maximumBreadth - 1;
		            res += `${join}"... ${getItemCount(removedKeys)} not stringified"`;
		          }
		          if (spacer !== '') {
		            res += `\n${originalIndentation}`;
		          }
		          stack.pop();
		          return `[${res}]`
		        }

		        let keys = Object.keys(value);
		        const keyLength = keys.length;
		        if (keyLength === 0) {
		          return '{}'
		        }
		        if (maximumDepth < stack.length + 1) {
		          return '"[Object]"'
		        }
		        let whitespace = '';
		        let separator = '';
		        if (spacer !== '') {
		          indentation += spacer;
		          join = `,\n${indentation}`;
		          whitespace = ' ';
		        }
		        const maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
		        if (deterministic && !isTypedArrayWithEntries(value)) {
		          keys = sort(keys, comparator);
		        }
		        stack.push(value);
		        for (let i = 0; i < maximumPropertiesToStringify; i++) {
		          const key = keys[i];
		          const tmp = stringifyFnReplacer(key, value, stack, replacer, spacer, indentation);
		          if (tmp !== undefined) {
		            res += `${separator}${strEscape(key)}:${whitespace}${tmp}`;
		            separator = join;
		          }
		        }
		        if (keyLength > maximumBreadth) {
		          const removedKeys = keyLength - maximumBreadth;
		          res += `${separator}"...":${whitespace}"${getItemCount(removedKeys)} not stringified"`;
		          separator = join;
		        }
		        if (spacer !== '' && separator.length > 1) {
		          res = `\n${indentation}${res}\n${originalIndentation}`;
		        }
		        stack.pop();
		        return `{${res}}`
		      }
		      case 'number':
		        return isFinite(value) ? String(value) : fail ? fail(value) : 'null'
		      case 'boolean':
		        return value === true ? 'true' : 'false'
		      case 'undefined':
		        return undefined
		      case 'bigint':
		        if (bigint) {
		          return String(value)
		        }
		        // fallthrough
		      default:
		        return fail ? fail(value) : undefined
		    }
		  }

		  function stringifyArrayReplacer (key, value, stack, replacer, spacer, indentation) {
		    if (typeof value === 'object' && value !== null && typeof value.toJSON === 'function') {
		      value = value.toJSON(key);
		    }

		    switch (typeof value) {
		      case 'string':
		        return strEscape(value)
		      case 'object': {
		        if (value === null) {
		          return 'null'
		        }
		        if (stack.indexOf(value) !== -1) {
		          return circularValue
		        }

		        const originalIndentation = indentation;
		        let res = '';
		        let join = ',';

		        if (Array.isArray(value)) {
		          if (value.length === 0) {
		            return '[]'
		          }
		          if (maximumDepth < stack.length + 1) {
		            return '"[Array]"'
		          }
		          stack.push(value);
		          if (spacer !== '') {
		            indentation += spacer;
		            res += `\n${indentation}`;
		            join = `,\n${indentation}`;
		          }
		          const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
		          let i = 0;
		          for (; i < maximumValuesToStringify - 1; i++) {
		            const tmp = stringifyArrayReplacer(String(i), value[i], stack, replacer, spacer, indentation);
		            res += tmp !== undefined ? tmp : 'null';
		            res += join;
		          }
		          const tmp = stringifyArrayReplacer(String(i), value[i], stack, replacer, spacer, indentation);
		          res += tmp !== undefined ? tmp : 'null';
		          if (value.length - 1 > maximumBreadth) {
		            const removedKeys = value.length - maximumBreadth - 1;
		            res += `${join}"... ${getItemCount(removedKeys)} not stringified"`;
		          }
		          if (spacer !== '') {
		            res += `\n${originalIndentation}`;
		          }
		          stack.pop();
		          return `[${res}]`
		        }
		        stack.push(value);
		        let whitespace = '';
		        if (spacer !== '') {
		          indentation += spacer;
		          join = `,\n${indentation}`;
		          whitespace = ' ';
		        }
		        let separator = '';
		        for (const key of replacer) {
		          const tmp = stringifyArrayReplacer(key, value[key], stack, replacer, spacer, indentation);
		          if (tmp !== undefined) {
		            res += `${separator}${strEscape(key)}:${whitespace}${tmp}`;
		            separator = join;
		          }
		        }
		        if (spacer !== '' && separator.length > 1) {
		          res = `\n${indentation}${res}\n${originalIndentation}`;
		        }
		        stack.pop();
		        return `{${res}}`
		      }
		      case 'number':
		        return isFinite(value) ? String(value) : fail ? fail(value) : 'null'
		      case 'boolean':
		        return value === true ? 'true' : 'false'
		      case 'undefined':
		        return undefined
		      case 'bigint':
		        if (bigint) {
		          return String(value)
		        }
		        // fallthrough
		      default:
		        return fail ? fail(value) : undefined
		    }
		  }

		  function stringifyIndent (key, value, stack, spacer, indentation) {
		    switch (typeof value) {
		      case 'string':
		        return strEscape(value)
		      case 'object': {
		        if (value === null) {
		          return 'null'
		        }
		        if (typeof value.toJSON === 'function') {
		          value = value.toJSON(key);
		          // Prevent calling `toJSON` again.
		          if (typeof value !== 'object') {
		            return stringifyIndent(key, value, stack, spacer, indentation)
		          }
		          if (value === null) {
		            return 'null'
		          }
		        }
		        if (stack.indexOf(value) !== -1) {
		          return circularValue
		        }
		        const originalIndentation = indentation;

		        if (Array.isArray(value)) {
		          if (value.length === 0) {
		            return '[]'
		          }
		          if (maximumDepth < stack.length + 1) {
		            return '"[Array]"'
		          }
		          stack.push(value);
		          indentation += spacer;
		          let res = `\n${indentation}`;
		          const join = `,\n${indentation}`;
		          const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
		          let i = 0;
		          for (; i < maximumValuesToStringify - 1; i++) {
		            const tmp = stringifyIndent(String(i), value[i], stack, spacer, indentation);
		            res += tmp !== undefined ? tmp : 'null';
		            res += join;
		          }
		          const tmp = stringifyIndent(String(i), value[i], stack, spacer, indentation);
		          res += tmp !== undefined ? tmp : 'null';
		          if (value.length - 1 > maximumBreadth) {
		            const removedKeys = value.length - maximumBreadth - 1;
		            res += `${join}"... ${getItemCount(removedKeys)} not stringified"`;
		          }
		          res += `\n${originalIndentation}`;
		          stack.pop();
		          return `[${res}]`
		        }

		        let keys = Object.keys(value);
		        const keyLength = keys.length;
		        if (keyLength === 0) {
		          return '{}'
		        }
		        if (maximumDepth < stack.length + 1) {
		          return '"[Object]"'
		        }
		        indentation += spacer;
		        const join = `,\n${indentation}`;
		        let res = '';
		        let separator = '';
		        let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
		        if (isTypedArrayWithEntries(value)) {
		          res += stringifyTypedArray(value, join, maximumBreadth);
		          keys = keys.slice(value.length);
		          maximumPropertiesToStringify -= value.length;
		          separator = join;
		        }
		        if (deterministic) {
		          keys = sort(keys, comparator);
		        }
		        stack.push(value);
		        for (let i = 0; i < maximumPropertiesToStringify; i++) {
		          const key = keys[i];
		          const tmp = stringifyIndent(key, value[key], stack, spacer, indentation);
		          if (tmp !== undefined) {
		            res += `${separator}${strEscape(key)}: ${tmp}`;
		            separator = join;
		          }
		        }
		        if (keyLength > maximumBreadth) {
		          const removedKeys = keyLength - maximumBreadth;
		          res += `${separator}"...": "${getItemCount(removedKeys)} not stringified"`;
		          separator = join;
		        }
		        if (separator !== '') {
		          res = `\n${indentation}${res}\n${originalIndentation}`;
		        }
		        stack.pop();
		        return `{${res}}`
		      }
		      case 'number':
		        return isFinite(value) ? String(value) : fail ? fail(value) : 'null'
		      case 'boolean':
		        return value === true ? 'true' : 'false'
		      case 'undefined':
		        return undefined
		      case 'bigint':
		        if (bigint) {
		          return String(value)
		        }
		        // fallthrough
		      default:
		        return fail ? fail(value) : undefined
		    }
		  }

		  function stringifySimple (key, value, stack) {
		    switch (typeof value) {
		      case 'string':
		        return strEscape(value)
		      case 'object': {
		        if (value === null) {
		          return 'null'
		        }
		        if (typeof value.toJSON === 'function') {
		          value = value.toJSON(key);
		          // Prevent calling `toJSON` again
		          if (typeof value !== 'object') {
		            return stringifySimple(key, value, stack)
		          }
		          if (value === null) {
		            return 'null'
		          }
		        }
		        if (stack.indexOf(value) !== -1) {
		          return circularValue
		        }

		        let res = '';

		        const hasLength = value.length !== undefined;
		        if (hasLength && Array.isArray(value)) {
		          if (value.length === 0) {
		            return '[]'
		          }
		          if (maximumDepth < stack.length + 1) {
		            return '"[Array]"'
		          }
		          stack.push(value);
		          const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
		          let i = 0;
		          for (; i < maximumValuesToStringify - 1; i++) {
		            const tmp = stringifySimple(String(i), value[i], stack);
		            res += tmp !== undefined ? tmp : 'null';
		            res += ',';
		          }
		          const tmp = stringifySimple(String(i), value[i], stack);
		          res += tmp !== undefined ? tmp : 'null';
		          if (value.length - 1 > maximumBreadth) {
		            const removedKeys = value.length - maximumBreadth - 1;
		            res += `,"... ${getItemCount(removedKeys)} not stringified"`;
		          }
		          stack.pop();
		          return `[${res}]`
		        }

		        let keys = Object.keys(value);
		        const keyLength = keys.length;
		        if (keyLength === 0) {
		          return '{}'
		        }
		        if (maximumDepth < stack.length + 1) {
		          return '"[Object]"'
		        }
		        let separator = '';
		        let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
		        if (hasLength && isTypedArrayWithEntries(value)) {
		          res += stringifyTypedArray(value, ',', maximumBreadth);
		          keys = keys.slice(value.length);
		          maximumPropertiesToStringify -= value.length;
		          separator = ',';
		        }
		        if (deterministic) {
		          keys = sort(keys, comparator);
		        }
		        stack.push(value);
		        for (let i = 0; i < maximumPropertiesToStringify; i++) {
		          const key = keys[i];
		          const tmp = stringifySimple(key, value[key], stack);
		          if (tmp !== undefined) {
		            res += `${separator}${strEscape(key)}:${tmp}`;
		            separator = ',';
		          }
		        }
		        if (keyLength > maximumBreadth) {
		          const removedKeys = keyLength - maximumBreadth;
		          res += `${separator}"...":"${getItemCount(removedKeys)} not stringified"`;
		        }
		        stack.pop();
		        return `{${res}}`
		      }
		      case 'number':
		        return isFinite(value) ? String(value) : fail ? fail(value) : 'null'
		      case 'boolean':
		        return value === true ? 'true' : 'false'
		      case 'undefined':
		        return undefined
		      case 'bigint':
		        if (bigint) {
		          return String(value)
		        }
		        // fallthrough
		      default:
		        return fail ? fail(value) : undefined
		    }
		  }

		  function stringify (value, replacer, space) {
		    if (arguments.length > 1) {
		      let spacer = '';
		      if (typeof space === 'number') {
		        spacer = ' '.repeat(Math.min(space, 10));
		      } else if (typeof space === 'string') {
		        spacer = space.slice(0, 10);
		      }
		      if (replacer != null) {
		        if (typeof replacer === 'function') {
		          return stringifyFnReplacer('', { '': value }, [], replacer, spacer, '')
		        }
		        if (Array.isArray(replacer)) {
		          return stringifyArrayReplacer('', value, [], getUniqueReplacerSet(replacer), spacer, '')
		        }
		      }
		      if (spacer.length !== 0) {
		        return stringifyIndent('', value, [], spacer, '')
		      }
		    }
		    return stringifySimple('', value, [])
		  }

		  return stringify
		} 
	} (safeStableStringify, safeStableStringify.exports));
	return safeStableStringify.exports;
}

var hasRequiredCreateLogger;

function requireCreateLogger () {
	if (hasRequiredCreateLogger) return createLogger;
	hasRequiredCreateLogger = 1;
	(function (exports) {
		var __importDefault = (createLogger && createLogger.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.createLogger = void 0;
		const config_1 = requireConfig();
		const constants_1 = requireConstants();
		const hasOwnProperty_1 = requireHasOwnProperty();
		const isBrowser_1 = requireIsBrowser();
		const isTruthy_1 = requireIsTruthy();
		const createMockLogger_1 = requireCreateMockLogger();
		const fast_printf_1 = requirePrintf();
		const safe_stable_stringify_1 = __importDefault(requireSafeStableStringify());
		let loggedWarningAsyncLocalContext = false;
		const getGlobalRoarrContext = () => {
		    return globalThis.ROARR;
		};
		const createDefaultAsyncLocalContext = () => {
		    return {
		        messageContext: {},
		        transforms: [],
		    };
		};
		const getAsyncLocalContext = () => {
		    const asyncLocalStorage = getGlobalRoarrContext().asyncLocalStorage;
		    if (!asyncLocalStorage) {
		        throw new Error('AsyncLocalContext is unavailable.');
		    }
		    const asyncLocalContext = asyncLocalStorage.getStore();
		    if (asyncLocalContext) {
		        return asyncLocalContext;
		    }
		    return createDefaultAsyncLocalContext();
		};
		const isAsyncLocalContextAvailable = () => {
		    return Boolean(getGlobalRoarrContext().asyncLocalStorage);
		};
		const getSequence = () => {
		    if (isAsyncLocalContextAvailable()) {
		        const asyncLocalContext = getAsyncLocalContext();
		        if ((0, hasOwnProperty_1.hasOwnProperty)(asyncLocalContext, 'sequenceRoot') &&
		            (0, hasOwnProperty_1.hasOwnProperty)(asyncLocalContext, 'sequence') &&
		            typeof asyncLocalContext.sequence === 'number') {
		            return (String(asyncLocalContext.sequenceRoot) +
		                '.' +
		                String(asyncLocalContext.sequence++));
		        }
		        return String(getGlobalRoarrContext().sequence++);
		    }
		    return String(getGlobalRoarrContext().sequence++);
		};
		const createChildLogger = (log, logLevel) => {
		    return (a, b, c, d, e, f, g, h, index, index_) => {
		        log.child({
		            logLevel,
		        })(a, b, c, d, e, f, g, h, index, index_);
		    };
		};
		const MAX_ONCE_ENTRIES = 1000;
		const createOnceChildLogger = (log, logLevel) => {
		    return (a, b, c, d, e, f, g, h, index, index_) => {
		        const key = (0, safe_stable_stringify_1.default)({
		            a,
		            b,
		            c,
		            d,
		            e,
		            f,
		            g,
		            h,
		            i: index,
		            j: index_,
		            logLevel,
		        });
		        if (!key) {
		            throw new Error('Expected key to be a string');
		        }
		        const onceLog = getGlobalRoarrContext().onceLog;
		        if (onceLog.has(key)) {
		            return;
		        }
		        onceLog.add(key);
		        if (onceLog.size > MAX_ONCE_ENTRIES) {
		            onceLog.clear();
		        }
		        log.child({
		            logLevel,
		        })(a, b, c, d, e, f, g, h, index, index_);
		    };
		};
		const createLogger$1 = (onMessage, parentMessageContext = {}, transforms = []) => {
		    var _a;
		    if (!(0, isBrowser_1.isBrowser)() && typeof process !== 'undefined') {
		        // eslint-disable-next-line node/no-process-env
		        const enabled = (0, isTruthy_1.isTruthy)((_a = process.env.ROARR_LOG) !== null && _a !== void 0 ? _a : '');
		        if (!enabled) {
		            return (0, createMockLogger_1.createMockLogger)(onMessage, parentMessageContext);
		        }
		    }
		    const log = (a, b, c, d, e, f, g, h, index, index_) => {
		        const time = Date.now();
		        const sequence = getSequence();
		        let asyncLocalContext;
		        if (isAsyncLocalContextAvailable()) {
		            asyncLocalContext = getAsyncLocalContext();
		        }
		        else {
		            asyncLocalContext = createDefaultAsyncLocalContext();
		        }
		        let context;
		        let message;
		        if (typeof a === 'string') {
		            context = {
		                ...asyncLocalContext.messageContext,
		                ...parentMessageContext,
		            };
		        }
		        else {
		            context = {
		                ...asyncLocalContext.messageContext,
		                ...parentMessageContext,
		                ...a,
		            };
		        }
		        if (typeof a === 'string' && b === undefined) {
		            message = a;
		        }
		        else if (typeof a === 'string') {
		            if (!a.includes('%')) {
		                throw new Error('When a string parameter is followed by other arguments, then it is assumed that you are attempting to format a message using printf syntax. You either forgot to add printf bindings or if you meant to add context to the log message, pass them in an object as the first parameter.');
		            }
		            message = (0, fast_printf_1.printf)(a, b, c, d, e, f, g, h, index, index_);
		        }
		        else {
		            let fallbackMessage = b;
		            if (typeof b !== 'string') {
		                if (b === undefined) {
		                    fallbackMessage = '';
		                }
		                else {
		                    throw new TypeError('Message must be a string. Received ' + typeof b + '.');
		                }
		            }
		            message = (0, fast_printf_1.printf)(fallbackMessage, c, d, e, f, g, h, index, index_);
		        }
		        let packet = {
		            context,
		            message,
		            sequence,
		            time,
		            version: config_1.ROARR_LOG_FORMAT_VERSION,
		        };
		        for (const transform of [...asyncLocalContext.transforms, ...transforms]) {
		            packet = transform(packet);
		            if (typeof packet !== 'object' || packet === null) {
		                throw new Error('Message transform function must return a message object.');
		            }
		        }
		        onMessage(packet);
		    };
		    /**
		     * Creates a child logger with the provided context.
		     * If context is an object, then its properties are prepended to all descending logs.
		     * If context is a function, then that function is used to process all descending logs.
		     */
		    log.child = (context) => {
		        let asyncLocalContext;
		        if (isAsyncLocalContextAvailable()) {
		            asyncLocalContext = getAsyncLocalContext();
		        }
		        else {
		            asyncLocalContext = createDefaultAsyncLocalContext();
		        }
		        if (typeof context === 'function') {
		            return (0, exports.createLogger)(onMessage, {
		                ...asyncLocalContext.messageContext,
		                ...parentMessageContext,
		                ...context,
		            }, [context, ...transforms]);
		        }
		        return (0, exports.createLogger)(onMessage, {
		            ...asyncLocalContext.messageContext,
		            ...parentMessageContext,
		            ...context,
		        }, transforms);
		    };
		    log.getContext = () => {
		        let asyncLocalContext;
		        if (isAsyncLocalContextAvailable()) {
		            asyncLocalContext = getAsyncLocalContext();
		        }
		        else {
		            asyncLocalContext = createDefaultAsyncLocalContext();
		        }
		        return {
		            ...asyncLocalContext.messageContext,
		            ...parentMessageContext,
		        };
		    };
		    log.adopt = async (routine, context) => {
		        if (!isAsyncLocalContextAvailable()) {
		            if (loggedWarningAsyncLocalContext === false) {
		                loggedWarningAsyncLocalContext = true;
		                onMessage({
		                    context: {
		                        logLevel: constants_1.logLevels.warn,
		                        package: 'roarr',
		                    },
		                    message: 'async_hooks are unavailable; Roarr.adopt will not function as expected',
		                    sequence: getSequence(),
		                    time: Date.now(),
		                    version: config_1.ROARR_LOG_FORMAT_VERSION,
		                });
		            }
		            return routine();
		        }
		        const asyncLocalContext = getAsyncLocalContext();
		        let sequenceRoot;
		        if ((0, hasOwnProperty_1.hasOwnProperty)(asyncLocalContext, 'sequenceRoot') &&
		            (0, hasOwnProperty_1.hasOwnProperty)(asyncLocalContext, 'sequence') &&
		            typeof asyncLocalContext.sequence === 'number') {
		            sequenceRoot =
		                asyncLocalContext.sequenceRoot +
		                    '.' +
		                    String(asyncLocalContext.sequence++);
		        }
		        else {
		            sequenceRoot = String(getGlobalRoarrContext().sequence++);
		        }
		        let nextContext = {
		            ...asyncLocalContext.messageContext,
		        };
		        const nextTransforms = [...asyncLocalContext.transforms];
		        if (typeof context === 'function') {
		            nextTransforms.push(context);
		        }
		        else {
		            nextContext = {
		                ...nextContext,
		                ...context,
		            };
		        }
		        const asyncLocalStorage = getGlobalRoarrContext().asyncLocalStorage;
		        if (!asyncLocalStorage) {
		            throw new Error('Async local context unavailable.');
		        }
		        return asyncLocalStorage.run({
		            messageContext: nextContext,
		            sequence: 0,
		            sequenceRoot,
		            transforms: nextTransforms,
		        }, () => {
		            return routine();
		        });
		    };
		    log.debug = createChildLogger(log, constants_1.logLevels.debug);
		    log.debugOnce = createOnceChildLogger(log, constants_1.logLevels.debug);
		    log.error = createChildLogger(log, constants_1.logLevels.error);
		    log.errorOnce = createOnceChildLogger(log, constants_1.logLevels.error);
		    log.fatal = createChildLogger(log, constants_1.logLevels.fatal);
		    log.fatalOnce = createOnceChildLogger(log, constants_1.logLevels.fatal);
		    log.info = createChildLogger(log, constants_1.logLevels.info);
		    log.infoOnce = createOnceChildLogger(log, constants_1.logLevels.info);
		    log.trace = createChildLogger(log, constants_1.logLevels.trace);
		    log.traceOnce = createOnceChildLogger(log, constants_1.logLevels.trace);
		    log.warn = createChildLogger(log, constants_1.logLevels.warn);
		    log.warnOnce = createOnceChildLogger(log, constants_1.logLevels.warn);
		    return log;
		};
		exports.createLogger = createLogger$1;
		
	} (createLogger));
	return createLogger;
}

var createRoarrInitialGlobalState = {};

var createNodeWriter = {};

var hasRequiredCreateNodeWriter;

function requireCreateNodeWriter () {
	if (hasRequiredCreateNodeWriter) return createNodeWriter;
	hasRequiredCreateNodeWriter = 1;
	Object.defineProperty(createNodeWriter, "__esModule", { value: true });
	createNodeWriter.createNodeWriter = void 0;
	const createBlockingWriter = (stream) => {
	    return (message) => {
	        stream.write(message + '\n');
	    };
	};
	const createNodeWriter$1 = () => {
	    var _a;
	    // eslint-disable-next-line node/no-process-env
	    const targetStream = ((_a = process.env.ROARR_STREAM) !== null && _a !== void 0 ? _a : 'STDOUT').toUpperCase();
	    const stream = targetStream.toUpperCase() === 'STDOUT' ? process.stdout : process.stderr;
	    stream.on('error', (error) => {
	        if (error.code === 'EPIPE') {
	            return;
	        }
	        throw error;
	    });
	    return createBlockingWriter(stream);
	};
	createNodeWriter.createNodeWriter = createNodeWriter$1;
	
	return createNodeWriter;
}

var semverCompare;
var hasRequiredSemverCompare;

function requireSemverCompare () {
	if (hasRequiredSemverCompare) return semverCompare;
	hasRequiredSemverCompare = 1;
	semverCompare = function cmp (a, b) {
	    var pa = a.split('.');
	    var pb = b.split('.');
	    for (var i = 0; i < 3; i++) {
	        var na = Number(pa[i]);
	        var nb = Number(pb[i]);
	        if (na > nb) return 1;
	        if (nb > na) return -1;
	        if (!isNaN(na) && isNaN(nb)) return 1;
	        if (isNaN(na) && !isNaN(nb)) return -1;
	    }
	    return 0;
	};
	return semverCompare;
}

var hasRequiredCreateRoarrInitialGlobalState;

function requireCreateRoarrInitialGlobalState () {
	if (hasRequiredCreateRoarrInitialGlobalState) return createRoarrInitialGlobalState;
	hasRequiredCreateRoarrInitialGlobalState = 1;
	var __importDefault = (createRoarrInitialGlobalState && createRoarrInitialGlobalState.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(createRoarrInitialGlobalState, "__esModule", { value: true });
	createRoarrInitialGlobalState.createRoarrInitialGlobalState = void 0;
	const config_1 = requireConfig();
	const createNodeWriter_1 = requireCreateNodeWriter();
	const semver_compare_1 = __importDefault(requireSemverCompare());
	const createRoarrInitialGlobalState$1 = (currentState) => {
	    const versions = (currentState.versions || []).concat();
	    if (versions.length > 1) {
	        versions.sort(semver_compare_1.default);
	    }
	    const currentIsLatestVersion = !versions.length ||
	        (0, semver_compare_1.default)(config_1.ROARR_VERSION, versions[versions.length - 1]) === 1;
	    if (!versions.includes(config_1.ROARR_VERSION)) {
	        versions.push(config_1.ROARR_VERSION);
	    }
	    versions.sort(semver_compare_1.default);
	    let newState = {
	        onceLog: new Set(),
	        sequence: 0,
	        ...currentState,
	        versions,
	    };
	    if (currentIsLatestVersion || !newState.write) {
	        try {
	            // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
	            const AsyncLocalStorage = require('node:async_hooks').AsyncLocalStorage;
	            const asyncLocalStorage = new AsyncLocalStorage();
	            newState = {
	                ...newState,
	                asyncLocalStorage,
	                write: (0, createNodeWriter_1.createNodeWriter)(),
	            };
	            // eslint-disable-next-line no-empty
	        }
	        catch (_a) { }
	    }
	    return newState;
	};
	createRoarrInitialGlobalState.createRoarrInitialGlobalState = createRoarrInitialGlobalState$1;
	
	return createRoarrInitialGlobalState;
}

var stringify = {};

var hasRequiredStringify;

function requireStringify () {
	if (hasRequiredStringify) return stringify;
	hasRequiredStringify = 1;
	Object.defineProperty(stringify, "__esModule", { value: true });
	stringify.stringify = void 0;
	const safe_stable_stringify_1 = requireSafeStableStringify();
	const safeStringify = (0, safe_stable_stringify_1.configure)({
	    deterministic: false,
	    // The reason for the following values is because it is fairly easy
	    // to accidentally pass astronomically large objects to the logger.
	    // For context, we were debugging a UI slowdown that was caused by
	    // unknowingly trying to pass 5MB worth of data to the logger context.
	    //
	    // I am starting with hard limits for now to assess the impact of the changes,
	    // but we may want to make these configurable in the future.
	    maximumBreadth: 20,
	    maximumDepth: 10,
	    strict: false,
	});
	const stringify$1 = (value) => {
	    var _a;
	    try {
	        return (_a = safeStringify(value)) !== null && _a !== void 0 ? _a : '';
	    }
	    catch (error) {
	        // The only time I've seen this happen is when the value was excessively large.
	        // eslint-disable-next-line no-console
	        console.error('[roarr] could not serialize value', value);
	        throw error;
	    }
	};
	stringify.stringify = stringify$1;
	
	return stringify;
}

var getLogLevelName = {};

var hasRequiredGetLogLevelName;

function requireGetLogLevelName () {
	if (hasRequiredGetLogLevelName) return getLogLevelName;
	hasRequiredGetLogLevelName = 1;
	Object.defineProperty(getLogLevelName, "__esModule", { value: true });
	getLogLevelName.getLogLevelName = void 0;
	const getLogLevelName$1 = (numericLogLevel) => {
	    if (numericLogLevel <= 10) {
	        return 'trace';
	    }
	    if (numericLogLevel <= 20) {
	        return 'debug';
	    }
	    if (numericLogLevel <= 30) {
	        return 'info';
	    }
	    if (numericLogLevel <= 40) {
	        return 'warn';
	    }
	    if (numericLogLevel <= 50) {
	        return 'error';
	    }
	    return 'fatal';
	};
	getLogLevelName.getLogLevelName = getLogLevelName$1;
	
	return getLogLevelName;
}

var hasRequiredRoarr;

function requireRoarr () {
	if (hasRequiredRoarr) return Roarr;
	hasRequiredRoarr = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.getLogLevelName = exports.logLevels = exports.Roarr = exports.ROARR = void 0;
		const createLogger_1 = requireCreateLogger();
		const createRoarrInitialGlobalState_1 = requireCreateRoarrInitialGlobalState();
		const stringify_1 = requireStringify();
		const ROARR = (0, createRoarrInitialGlobalState_1.createRoarrInitialGlobalState)(globalThis.ROARR || {});
		exports.ROARR = ROARR;
		globalThis.ROARR = ROARR;
		const serializeMessage = (message) => {
		    return (0, stringify_1.stringify)(message);
		};
		const Roarr = (0, createLogger_1.createLogger)((message) => {
		    var _a;
		    if (ROARR.write) {
		        // Stringify message as soon as it is received to prevent
		        // properties of the context from being modified by reference.
		        ROARR.write(((_a = ROARR.serializeMessage) !== null && _a !== void 0 ? _a : serializeMessage)(message));
		    }
		});
		exports.Roarr = Roarr;
		var constants_1 = requireConstants();
		Object.defineProperty(exports, "logLevels", { enumerable: true, get: function () { return constants_1.logLevels; } });
		var getLogLevelName_1 = requireGetLogLevelName();
		Object.defineProperty(exports, "getLogLevelName", { enumerable: true, get: function () { return getLogLevelName_1.getLogLevelName; } });
		
	} (Roarr));
	return Roarr;
}

var RoarrExports = requireRoarr();

var dist = {};

var createLogWriter = {};

var createLogMethods = {};

var hasRequiredCreateLogMethods;

function requireCreateLogMethods () {
	if (hasRequiredCreateLogMethods) return createLogMethods;
	hasRequiredCreateLogMethods = 1;
	/* eslint-disable no-console */
	Object.defineProperty(createLogMethods, "__esModule", { value: true });
	createLogMethods.createLogMethods = void 0;
	var createLogMethods$1 = function () {
	    return {
	        debug: console.debug.bind(console),
	        error: console.error.bind(console),
	        fatal: console.error.bind(console),
	        info: console.info.bind(console),
	        trace: console.debug.bind(console),
	        warn: console.warn.bind(console),
	    };
	};
	createLogMethods.createLogMethods = createLogMethods$1;
	return createLogMethods;
}

var lib = {};

var boolean = {};

var hasRequiredBoolean;

function requireBoolean () {
	if (hasRequiredBoolean) return boolean;
	hasRequiredBoolean = 1;
	Object.defineProperty(boolean, "__esModule", { value: true });
	boolean.boolean = void 0;
	const boolean$1 = function (value) {
	    switch (Object.prototype.toString.call(value)) {
	        case '[object String]':
	            return ['true', 't', 'yes', 'y', 'on', '1'].includes(value.trim().toLowerCase());
	        case '[object Number]':
	            return value.valueOf() === 1;
	        case '[object Boolean]':
	            return value.valueOf();
	        default:
	            return false;
	    }
	};
	boolean.boolean = boolean$1;
	return boolean;
}

var isBooleanable = {};

var hasRequiredIsBooleanable;

function requireIsBooleanable () {
	if (hasRequiredIsBooleanable) return isBooleanable;
	hasRequiredIsBooleanable = 1;
	Object.defineProperty(isBooleanable, "__esModule", { value: true });
	isBooleanable.isBooleanable = void 0;
	const isBooleanable$1 = function (value) {
	    switch (Object.prototype.toString.call(value)) {
	        case '[object String]':
	            return [
	                'true', 't', 'yes', 'y', 'on', '1',
	                'false', 'f', 'no', 'n', 'off', '0'
	            ].includes(value.trim().toLowerCase());
	        case '[object Number]':
	            return [0, 1].includes(value.valueOf());
	        case '[object Boolean]':
	            return true;
	        default:
	            return false;
	    }
	};
	isBooleanable.isBooleanable = isBooleanable$1;
	return isBooleanable;
}

var hasRequiredLib;

function requireLib () {
	if (hasRequiredLib) return lib;
	hasRequiredLib = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.isBooleanable = exports.boolean = void 0;
		const boolean_1 = requireBoolean();
		Object.defineProperty(exports, "boolean", { enumerable: true, get: function () { return boolean_1.boolean; } });
		const isBooleanable_1 = requireIsBooleanable();
		Object.defineProperty(exports, "isBooleanable", { enumerable: true, get: function () { return isBooleanable_1.isBooleanable; } }); 
	} (lib));
	return lib;
}

var isArguments;
var hasRequiredIsArguments;

function requireIsArguments () {
	if (hasRequiredIsArguments) return isArguments;
	hasRequiredIsArguments = 1;

	var toStr = Object.prototype.toString;

	isArguments = function isArguments(value) {
		var str = toStr.call(value);
		var isArgs = str === '[object Arguments]';
		if (!isArgs) {
			isArgs = str !== '[object Array]' &&
				value !== null &&
				typeof value === 'object' &&
				typeof value.length === 'number' &&
				value.length >= 0 &&
				toStr.call(value.callee) === '[object Function]';
		}
		return isArgs;
	};
	return isArguments;
}

var implementation$1;
var hasRequiredImplementation$1;

function requireImplementation$1 () {
	if (hasRequiredImplementation$1) return implementation$1;
	hasRequiredImplementation$1 = 1;

	var keysShim;
	if (!Object.keys) {
		// modified from https://github.com/es-shims/es5-shim
		var has = Object.prototype.hasOwnProperty;
		var toStr = Object.prototype.toString;
		var isArgs = requireIsArguments(); // eslint-disable-line global-require
		var isEnumerable = Object.prototype.propertyIsEnumerable;
		var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
		var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
		var dontEnums = [
			'toString',
			'toLocaleString',
			'valueOf',
			'hasOwnProperty',
			'isPrototypeOf',
			'propertyIsEnumerable',
			'constructor'
		];
		var equalsConstructorPrototype = function (o) {
			var ctor = o.constructor;
			return ctor && ctor.prototype === o;
		};
		var excludedKeys = {
			$applicationCache: true,
			$console: true,
			$external: true,
			$frame: true,
			$frameElement: true,
			$frames: true,
			$innerHeight: true,
			$innerWidth: true,
			$onmozfullscreenchange: true,
			$onmozfullscreenerror: true,
			$outerHeight: true,
			$outerWidth: true,
			$pageXOffset: true,
			$pageYOffset: true,
			$parent: true,
			$scrollLeft: true,
			$scrollTop: true,
			$scrollX: true,
			$scrollY: true,
			$self: true,
			$webkitIndexedDB: true,
			$webkitStorageInfo: true,
			$window: true
		};
		var hasAutomationEqualityBug = (function () {
			/* global window */
			if (typeof window === 'undefined') { return false; }
			for (var k in window) {
				try {
					if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
						try {
							equalsConstructorPrototype(window[k]);
						} catch (e) {
							return true;
						}
					}
				} catch (e) {
					return true;
				}
			}
			return false;
		}());
		var equalsConstructorPrototypeIfNotBuggy = function (o) {
			/* global window */
			if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
				return equalsConstructorPrototype(o);
			}
			try {
				return equalsConstructorPrototype(o);
			} catch (e) {
				return false;
			}
		};

		keysShim = function keys(object) {
			var isObject = object !== null && typeof object === 'object';
			var isFunction = toStr.call(object) === '[object Function]';
			var isArguments = isArgs(object);
			var isString = isObject && toStr.call(object) === '[object String]';
			var theKeys = [];

			if (!isObject && !isFunction && !isArguments) {
				throw new TypeError('Object.keys called on a non-object');
			}

			var skipProto = hasProtoEnumBug && isFunction;
			if (isString && object.length > 0 && !has.call(object, 0)) {
				for (var i = 0; i < object.length; ++i) {
					theKeys.push(String(i));
				}
			}

			if (isArguments && object.length > 0) {
				for (var j = 0; j < object.length; ++j) {
					theKeys.push(String(j));
				}
			} else {
				for (var name in object) {
					if (!(skipProto && name === 'prototype') && has.call(object, name)) {
						theKeys.push(String(name));
					}
				}
			}

			if (hasDontEnumBug) {
				var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

				for (var k = 0; k < dontEnums.length; ++k) {
					if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
						theKeys.push(dontEnums[k]);
					}
				}
			}
			return theKeys;
		};
	}
	implementation$1 = keysShim;
	return implementation$1;
}

var objectKeys;
var hasRequiredObjectKeys;

function requireObjectKeys () {
	if (hasRequiredObjectKeys) return objectKeys;
	hasRequiredObjectKeys = 1;

	var slice = Array.prototype.slice;
	var isArgs = requireIsArguments();

	var origKeys = Object.keys;
	var keysShim = origKeys ? function keys(o) { return origKeys(o); } : requireImplementation$1();

	var originalKeys = Object.keys;

	keysShim.shim = function shimObjectKeys() {
		if (Object.keys) {
			var keysWorksWithArguments = (function () {
				// Safari 5.0 bug
				var args = Object.keys(arguments);
				return args && args.length === arguments.length;
			}(1, 2));
			if (!keysWorksWithArguments) {
				Object.keys = function keys(object) { // eslint-disable-line func-name-matching
					if (isArgs(object)) {
						return originalKeys(slice.call(object));
					}
					return originalKeys(object);
				};
			}
		} else {
			Object.keys = keysShim;
		}
		return Object.keys || keysShim;
	};

	objectKeys = keysShim;
	return objectKeys;
}

var esDefineProperty;
var hasRequiredEsDefineProperty;

function requireEsDefineProperty () {
	if (hasRequiredEsDefineProperty) return esDefineProperty;
	hasRequiredEsDefineProperty = 1;

	/** @type {import('.')} */
	var $defineProperty = Object.defineProperty || false;
	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
		} catch (e) {
			// IE 8 has a broken defineProperty
			$defineProperty = false;
		}
	}

	esDefineProperty = $defineProperty;
	return esDefineProperty;
}

var syntax;
var hasRequiredSyntax;

function requireSyntax () {
	if (hasRequiredSyntax) return syntax;
	hasRequiredSyntax = 1;

	/** @type {import('./syntax')} */
	syntax = SyntaxError;
	return syntax;
}

var type;
var hasRequiredType;

function requireType () {
	if (hasRequiredType) return type;
	hasRequiredType = 1;

	/** @type {import('./type')} */
	type = TypeError;
	return type;
}

var gOPD;
var hasRequiredGOPD;

function requireGOPD () {
	if (hasRequiredGOPD) return gOPD;
	hasRequiredGOPD = 1;

	/** @type {import('./gOPD')} */
	gOPD = Object.getOwnPropertyDescriptor;
	return gOPD;
}

var gopd;
var hasRequiredGopd;

function requireGopd () {
	if (hasRequiredGopd) return gopd;
	hasRequiredGopd = 1;

	/** @type {import('.')} */
	var $gOPD = /*@__PURE__*/ requireGOPD();

	if ($gOPD) {
		try {
			$gOPD([], 'length');
		} catch (e) {
			// IE 8 has a broken gOPD
			$gOPD = null;
		}
	}

	gopd = $gOPD;
	return gopd;
}

var defineDataProperty;
var hasRequiredDefineDataProperty;

function requireDefineDataProperty () {
	if (hasRequiredDefineDataProperty) return defineDataProperty;
	hasRequiredDefineDataProperty = 1;

	var $defineProperty = /*@__PURE__*/ requireEsDefineProperty();

	var $SyntaxError = /*@__PURE__*/ requireSyntax();
	var $TypeError = /*@__PURE__*/ requireType();

	var gopd = /*@__PURE__*/ requireGopd();

	/** @type {import('.')} */
	defineDataProperty = function defineDataProperty(
		obj,
		property,
		value
	) {
		if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
			throw new $TypeError('`obj` must be an object or a function`');
		}
		if (typeof property !== 'string' && typeof property !== 'symbol') {
			throw new $TypeError('`property` must be a string or a symbol`');
		}
		if (arguments.length > 3 && typeof arguments[3] !== 'boolean' && arguments[3] !== null) {
			throw new $TypeError('`nonEnumerable`, if provided, must be a boolean or null');
		}
		if (arguments.length > 4 && typeof arguments[4] !== 'boolean' && arguments[4] !== null) {
			throw new $TypeError('`nonWritable`, if provided, must be a boolean or null');
		}
		if (arguments.length > 5 && typeof arguments[5] !== 'boolean' && arguments[5] !== null) {
			throw new $TypeError('`nonConfigurable`, if provided, must be a boolean or null');
		}
		if (arguments.length > 6 && typeof arguments[6] !== 'boolean') {
			throw new $TypeError('`loose`, if provided, must be a boolean');
		}

		var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
		var nonWritable = arguments.length > 4 ? arguments[4] : null;
		var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
		var loose = arguments.length > 6 ? arguments[6] : false;

		/* @type {false | TypedPropertyDescriptor<unknown>} */
		var desc = !!gopd && gopd(obj, property);

		if ($defineProperty) {
			$defineProperty(obj, property, {
				configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
				enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
				value: value,
				writable: nonWritable === null && desc ? desc.writable : !nonWritable
			});
		} else if (loose || (!nonEnumerable && !nonWritable && !nonConfigurable)) {
			// must fall back to [[Set]], and was not explicitly asked to make non-enumerable, non-writable, or non-configurable
			obj[property] = value; // eslint-disable-line no-param-reassign
		} else {
			throw new $SyntaxError('This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.');
		}
	};
	return defineDataProperty;
}

var hasPropertyDescriptors_1;
var hasRequiredHasPropertyDescriptors;

function requireHasPropertyDescriptors () {
	if (hasRequiredHasPropertyDescriptors) return hasPropertyDescriptors_1;
	hasRequiredHasPropertyDescriptors = 1;

	var $defineProperty = /*@__PURE__*/ requireEsDefineProperty();

	var hasPropertyDescriptors = function hasPropertyDescriptors() {
		return !!$defineProperty;
	};

	hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
		// node v0.6 has a bug where array lengths can be Set but not Defined
		if (!$defineProperty) {
			return null;
		}
		try {
			return $defineProperty([], 'length', { value: 1 }).length !== 1;
		} catch (e) {
			// In Firefox 4-22, defining length on an array throws an exception.
			return true;
		}
	};

	hasPropertyDescriptors_1 = hasPropertyDescriptors;
	return hasPropertyDescriptors_1;
}

var defineProperties_1;
var hasRequiredDefineProperties;

function requireDefineProperties () {
	if (hasRequiredDefineProperties) return defineProperties_1;
	hasRequiredDefineProperties = 1;

	var keys = requireObjectKeys();
	var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

	var toStr = Object.prototype.toString;
	var concat = Array.prototype.concat;
	var defineDataProperty = /*@__PURE__*/ requireDefineDataProperty();

	var isFunction = function (fn) {
		return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
	};

	var supportsDescriptors = /*@__PURE__*/ requireHasPropertyDescriptors()();

	var defineProperty = function (object, name, value, predicate) {
		if (name in object) {
			if (predicate === true) {
				if (object[name] === value) {
					return;
				}
			} else if (!isFunction(predicate) || !predicate()) {
				return;
			}
		}

		if (supportsDescriptors) {
			defineDataProperty(object, name, value, true);
		} else {
			defineDataProperty(object, name, value);
		}
	};

	var defineProperties = function (object, map) {
		var predicates = arguments.length > 2 ? arguments[2] : {};
		var props = keys(map);
		if (hasSymbols) {
			props = concat.call(props, Object.getOwnPropertySymbols(map));
		}
		for (var i = 0; i < props.length; i += 1) {
			defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
		}
	};

	defineProperties.supportsDescriptors = !!supportsDescriptors;

	defineProperties_1 = defineProperties;
	return defineProperties_1;
}

var implementation;
var hasRequiredImplementation;

function requireImplementation () {
	if (hasRequiredImplementation) return implementation;
	hasRequiredImplementation = 1;

	implementation = commonjsGlobal;
	return implementation;
}

var polyfill;
var hasRequiredPolyfill;

function requirePolyfill () {
	if (hasRequiredPolyfill) return polyfill;
	hasRequiredPolyfill = 1;

	var implementation = requireImplementation();

	polyfill = function getPolyfill() {
		if (typeof commonjsGlobal !== 'object' || !commonjsGlobal || commonjsGlobal.Math !== Math || commonjsGlobal.Array !== Array) {
			return implementation;
		}
		return commonjsGlobal;
	};
	return polyfill;
}

var shim;
var hasRequiredShim;

function requireShim () {
	if (hasRequiredShim) return shim;
	hasRequiredShim = 1;

	var define = requireDefineProperties();
	var gOPD = /*@__PURE__*/ requireGopd();
	var getPolyfill = requirePolyfill();

	shim = function shimGlobal() {
		var polyfill = getPolyfill();
		if (define.supportsDescriptors) {
			var descriptor = gOPD(polyfill, 'globalThis');
			if (
				!descriptor
				|| (
					descriptor.configurable
					&& (descriptor.enumerable || !descriptor.writable || globalThis !== polyfill)
				)
			) {
				Object.defineProperty(polyfill, 'globalThis', {
					configurable: true,
					enumerable: false,
					value: polyfill,
					writable: true
				});
			}
		} else if (typeof globalThis !== 'object' || globalThis !== polyfill) {
			polyfill.globalThis = polyfill;
		}
		return polyfill;
	};
	return shim;
}

var globalthis;
var hasRequiredGlobalthis;

function requireGlobalthis () {
	if (hasRequiredGlobalthis) return globalthis;
	hasRequiredGlobalthis = 1;

	var defineProperties = requireDefineProperties();

	var implementation = requireImplementation();
	var getPolyfill = requirePolyfill();
	var shim = requireShim();

	var polyfill = getPolyfill();

	var getGlobal = function () { return polyfill; };

	defineProperties(getGlobal, {
		getPolyfill: getPolyfill,
		implementation: implementation,
		shim: shim
	});

	globalthis = getGlobal;
	return globalthis;
}

var Liqe = {};

var errors = {};

class ExtendableError extends Error {
  constructor(...params) {
    super(...params);
    var message =
      params.length > 0 && typeof params[0] === "string" ? params[0] : "";

    // Replace Error with ClassName of the constructor, if it has not been overwritten already
    if (this.name === undefined || this.name === "Error") {
      Object.defineProperty(this, "name", {
        configurable: true,
        enumerable: false,
        value: this.constructor.name,
        writable: true,
      });
    }

    Object.defineProperty(this, "message", {
      configurable: true,
      enumerable: false,
      value: message,
      writable: true,
    });

    Object.defineProperty(this, "stack", {
      configurable: true,
      enumerable: false,
      value: "",
      writable: true,
    });

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else if (this.stack === "") {
      this.stack = new Error(message).stack;
    }
  }
}

var es = /*#__PURE__*/Object.freeze({
	__proto__: null,
	ExtendableError: ExtendableError,
	default: ExtendableError
});

var require$$0 = /*@__PURE__*/getAugmentedNamespace(es);

var hasRequiredErrors;

function requireErrors () {
	if (hasRequiredErrors) return errors;
	hasRequiredErrors = 1;
	Object.defineProperty(errors, "__esModule", { value: true });
	errors.SyntaxError = errors.LiqeError = void 0;
	const ts_error_1 = require$$0;
	class LiqeError extends ts_error_1.ExtendableError {
	}
	errors.LiqeError = LiqeError;
	class SyntaxError extends LiqeError {
	    constructor(message, offset, line, column) {
	        super(message);
	        this.message = message;
	        this.offset = offset;
	        this.line = line;
	        this.column = column;
	    }
	}
	errors.SyntaxError = SyntaxError;
	return errors;
}

var filter = {};

var internalFilter = {};

var createStringTest = {};

var convertWildcardToRegex = {};

var hasRequiredConvertWildcardToRegex;

function requireConvertWildcardToRegex () {
	if (hasRequiredConvertWildcardToRegex) return convertWildcardToRegex;
	hasRequiredConvertWildcardToRegex = 1;
	Object.defineProperty(convertWildcardToRegex, "__esModule", { value: true });
	convertWildcardToRegex.convertWildcardToRegex = void 0;
	const WILDCARD_RULE = /(\*+)|(\?)/g;
	const convertWildcardToRegex$1 = (pattern) => {
	    return new RegExp(pattern.replaceAll(WILDCARD_RULE, (_match, p1) => {
	        return p1 ? '(.+?)' : '(.)';
	    }));
	};
	convertWildcardToRegex.convertWildcardToRegex = convertWildcardToRegex$1;
	return convertWildcardToRegex;
}

var escapeRegexString = {};

var hasRequiredEscapeRegexString;

function requireEscapeRegexString () {
	if (hasRequiredEscapeRegexString) return escapeRegexString;
	hasRequiredEscapeRegexString = 1;
	Object.defineProperty(escapeRegexString, "__esModule", { value: true });
	escapeRegexString.escapeRegexString = void 0;
	const ESCAPE_RULE = /[$()*+.?[\\\]^{|}]/g;
	const DASH_RULE = /-/g;
	const escapeRegexString$1 = (subject) => {
	    return subject.replaceAll(ESCAPE_RULE, '\\$&').replaceAll(DASH_RULE, '\\x2d');
	};
	escapeRegexString.escapeRegexString = escapeRegexString$1;
	return escapeRegexString;
}

var parseRegex = {};

var hasRequiredParseRegex;

function requireParseRegex () {
	if (hasRequiredParseRegex) return parseRegex;
	hasRequiredParseRegex = 1;
	Object.defineProperty(parseRegex, "__esModule", { value: true });
	parseRegex.parseRegex = void 0;
	const RegExpRule = /(\/?)(.+)\1([a-z]*)/;
	const FlagRule = /^(?!.*?(.).*?\1)[AJUXgimsux]+$/;
	const parseRegex$1 = (subject) => {
	    const match = RegExpRule.exec(subject);
	    if (!match) {
	        throw new Error('Invalid RegExp.');
	    }
	    if (match[3] && !FlagRule.test(match[3])) {
	        return new RegExp(subject);
	    }
	    return new RegExp(match[2], match[3]);
	};
	parseRegex.parseRegex = parseRegex$1;
	return parseRegex;
}

var hasRequiredCreateStringTest;

function requireCreateStringTest () {
	if (hasRequiredCreateStringTest) return createStringTest;
	hasRequiredCreateStringTest = 1;
	Object.defineProperty(createStringTest, "__esModule", { value: true });
	createStringTest.createStringTest = void 0;
	const convertWildcardToRegex_1 = requireConvertWildcardToRegex();
	const escapeRegexString_1 = requireEscapeRegexString();
	const parseRegex_1 = requireParseRegex();
	const createRegexTest = (regexCache, regex) => {
	    let rule;
	    if (regexCache[regex]) {
	        rule = regexCache[regex];
	    }
	    else {
	        rule = (0, parseRegex_1.parseRegex)(regex);
	        regexCache[regex] = rule;
	    }
	    return (subject) => {
	        var _a, _b;
	        return (_b = (_a = subject.match(rule)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : false;
	    };
	};
	const createStringTest$1 = (regexCache, ast) => {
	    if (ast.type !== 'Tag') {
	        throw new Error('Expected a tag expression.');
	    }
	    const { expression } = ast;
	    if (expression.type === 'RangeExpression') {
	        throw new Error('Unexpected range expression.');
	    }
	    if (expression.type === 'RegexExpression') {
	        return createRegexTest(regexCache, expression.value);
	    }
	    if (expression.type !== 'LiteralExpression') {
	        throw new Error('Expected a literal expression.');
	    }
	    const value = String(expression.value);
	    if ((value.includes('*') || value.includes('?')) &&
	        expression.quoted === false) {
	        return createRegexTest(regexCache, String((0, convertWildcardToRegex_1.convertWildcardToRegex)(value)) + 'ui');
	    }
	    else {
	        return createRegexTest(regexCache, '/(' + (0, escapeRegexString_1.escapeRegexString)(value) + ')/' + (expression.quoted ? 'u' : 'ui'));
	    }
	};
	createStringTest.createStringTest = createStringTest$1;
	return createStringTest;
}

var testComparisonRange = {};

var hasRequiredTestComparisonRange;

function requireTestComparisonRange () {
	if (hasRequiredTestComparisonRange) return testComparisonRange;
	hasRequiredTestComparisonRange = 1;
	Object.defineProperty(testComparisonRange, "__esModule", { value: true });
	testComparisonRange.testComparisonRange = void 0;
	const testComparisonRange$1 = (query, value, operator) => {
	    switch (operator) {
	        case ':<':
	            return value < query;
	        case ':<=':
	            return value <= query;
	        case ':=':
	            return value === query;
	        case ':>':
	            return value > query;
	        case ':>=':
	            return value >= query;
	        default:
	            throw new Error(`Unimplemented comparison operator: ${operator}`);
	    }
	};
	testComparisonRange.testComparisonRange = testComparisonRange$1;
	return testComparisonRange;
}

var testRange = {};

var hasRequiredTestRange;

function requireTestRange () {
	if (hasRequiredTestRange) return testRange;
	hasRequiredTestRange = 1;
	Object.defineProperty(testRange, "__esModule", { value: true });
	testRange.testRange = void 0;
	const testRange$1 = (value, range) => {
	    if (typeof value === 'number') {
	        if (value < range.min) {
	            return false;
	        }
	        if (value === range.min && !range.minInclusive) {
	            return false;
	        }
	        if (value > range.max) {
	            return false;
	        }
	        if (value === range.max && !range.maxInclusive) {
	            return false;
	        }
	        return true;
	    }
	    // @todo handle non-numeric ranges -- https://github.com/gajus/liqe/issues/3
	    return false;
	};
	testRange.testRange = testRange$1;
	return testRange;
}

var hasRequiredInternalFilter;

function requireInternalFilter () {
	if (hasRequiredInternalFilter) return internalFilter;
	hasRequiredInternalFilter = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.internalFilter = void 0;
		const createStringTest_1 = requireCreateStringTest();
		const testComparisonRange_1 = requireTestComparisonRange();
		const testRange_1 = requireTestRange();
		const createValueTest = (ast) => {
		    if (ast.type !== 'Tag') {
		        throw new Error('Expected a tag expression.');
		    }
		    const { expression } = ast;
		    if (expression.type === 'RangeExpression') {
		        return (value) => {
		            return (0, testRange_1.testRange)(value, expression.range);
		        };
		    }
		    if (expression.type === 'EmptyExpression') {
		        return () => {
		            return false;
		        };
		    }
		    const expressionValue = expression.value;
		    if (ast.operator && ast.operator.operator !== ':') {
		        const operator = ast.operator;
		        if (typeof expressionValue !== 'number') {
		            throw new TypeError('Expected a number.');
		        }
		        return (value) => {
		            if (typeof value !== 'number') {
		                return false;
		            }
		            return (0, testComparisonRange_1.testComparisonRange)(expressionValue, value, operator.operator);
		        };
		    }
		    else if (typeof expressionValue === 'boolean') {
		        return (value) => {
		            return value === expressionValue;
		        };
		    }
		    else if (expressionValue === null) {
		        return (value) => {
		            return value === null;
		        };
		    }
		    else {
		        const testString = (0, createStringTest_1.createStringTest)({}, ast);
		        return (value) => {
		            return testString(String(value));
		        };
		    }
		};
		const testValue = (ast, value, resultFast, path, highlights) => {
		    if (Array.isArray(value)) {
		        let foundMatch = false;
		        let index = 0;
		        for (const item of value) {
		            if (testValue(ast, item, resultFast, [...path, String(index++)], highlights)) {
		                if (resultFast) {
		                    return true;
		                }
		                foundMatch = true;
		            }
		        }
		        return foundMatch;
		    }
		    else if (typeof value === 'object' && value !== null) {
		        let foundMatch = false;
		        for (const key in value) {
		            if (testValue(ast, value[key], resultFast, [...path, key], highlights)) {
		                if (resultFast) {
		                    return true;
		                }
		                foundMatch = true;
		            }
		        }
		        return foundMatch;
		    }
		    if (ast.type !== 'Tag') {
		        throw new Error('Expected a tag expression.');
		    }
		    if (!ast.test) {
		        throw new Error('Expected test to be defined.');
		    }
		    const result = ast.test(value);
		    if (result) {
		        highlights.push({
		            ...(typeof result === 'string' && { keyword: result }),
		            path: path.join('.'),
		        });
		        return true;
		    }
		    return Boolean(result);
		};
		const testField = (row, ast, resultFast, path, highlights) => {
		    if (ast.type !== 'Tag') {
		        throw new Error('Expected a tag expression.');
		    }
		    if (!ast.test) {
		        ast.test = createValueTest(ast);
		    }
		    if (ast.field.type === 'ImplicitField') {
		        let foundMatch = false;
		        for (const fieldName in row) {
		            if (testValue({
		                ...ast,
		                field: {
		                    location: {
		                        end: -1,
		                        start: -1,
		                    },
		                    name: fieldName,
		                    quoted: true,
		                    quotes: 'double',
		                    type: 'Field',
		                },
		            }, row[fieldName], resultFast, [...path, fieldName], highlights)) {
		                if (resultFast) {
		                    return true;
		                }
		                foundMatch = true;
		            }
		        }
		        return foundMatch;
		    }
		    if (ast.field.name in row) {
		        return testValue(ast, row[ast.field.name], resultFast, path, highlights);
		    }
		    else if (ast.getValue && ast.field.path) {
		        return testValue(ast, ast.getValue(row), resultFast, ast.field.path, highlights);
		    }
		    else if (ast.field.path) {
		        let value = row;
		        for (const key of ast.field.path) {
		            if (typeof value !== 'object' || value === null) {
		                return false;
		            }
		            else if (key in value) {
		                value = value[key];
		            }
		            else {
		                return false;
		            }
		        }
		        return testValue(ast, value, resultFast, ast.field.path, highlights);
		    }
		    else {
		        return false;
		    }
		};
		const internalFilter = (ast, rows, resultFast = true, path = [], highlights = []) => {
		    if (ast.type === 'Tag') {
		        return rows.filter((row) => {
		            return testField(row, ast, resultFast, ast.field.type === 'ImplicitField' ? path : [...path, ast.field.name], highlights);
		        });
		    }
		    if (ast.type === 'UnaryOperator') {
		        const removeRows = (0, exports.internalFilter)(ast.operand, rows, resultFast, path, []);
		        return rows.filter((row) => {
		            return !removeRows.includes(row);
		        });
		    }
		    if (ast.type === 'ParenthesizedExpression') {
		        return (0, exports.internalFilter)(ast.expression, rows, resultFast, path, highlights);
		    }
		    if (!ast.left) {
		        throw new Error('Expected left to be defined.');
		    }
		    const leftRows = (0, exports.internalFilter)(ast.left, rows, resultFast, path, highlights);
		    if (!ast.right) {
		        throw new Error('Expected right to be defined.');
		    }
		    if (ast.type !== 'LogicalExpression') {
		        throw new Error('Expected a tag expression.');
		    }
		    if (ast.operator.operator === 'OR') {
		        const rightRows = (0, exports.internalFilter)(ast.right, rows, resultFast, path, highlights);
		        return Array.from(new Set([...leftRows, ...rightRows]));
		    }
		    else if (ast.operator.operator === 'AND') {
		        return (0, exports.internalFilter)(ast.right, leftRows, resultFast, path, highlights);
		    }
		    throw new Error('Unexpected state.');
		};
		exports.internalFilter = internalFilter; 
	} (internalFilter));
	return internalFilter;
}

var hasRequiredFilter;

function requireFilter () {
	if (hasRequiredFilter) return filter;
	hasRequiredFilter = 1;
	Object.defineProperty(filter, "__esModule", { value: true });
	filter.filter = void 0;
	const internalFilter_1 = requireInternalFilter();
	const filter$1 = (ast, data) => {
	    return (0, internalFilter_1.internalFilter)(ast, data);
	};
	filter.filter = filter$1;
	return filter;
}

var highlight$1 = {};

var hasRequiredHighlight;

function requireHighlight () {
	if (hasRequiredHighlight) return highlight$1;
	hasRequiredHighlight = 1;
	Object.defineProperty(highlight$1, "__esModule", { value: true });
	highlight$1.highlight = void 0;
	const escapeRegexString_1 = requireEscapeRegexString();
	const internalFilter_1 = requireInternalFilter();
	const highlight = (ast, data) => {
	    const highlights = [];
	    (0, internalFilter_1.internalFilter)(ast, [data], false, [], highlights);
	    const aggregatedHighlights = [];
	    for (const highlightNode of highlights) {
	        let aggregatedHighlight = aggregatedHighlights.find((maybeTarget) => {
	            return maybeTarget.path === highlightNode.path;
	        });
	        if (!aggregatedHighlight) {
	            aggregatedHighlight = {
	                keywords: [],
	                path: highlightNode.path,
	            };
	            aggregatedHighlights.push(aggregatedHighlight);
	        }
	        if (highlightNode.keyword) {
	            aggregatedHighlight.keywords.push(highlightNode.keyword);
	        }
	    }
	    return aggregatedHighlights.map((aggregatedHighlight) => {
	        if (aggregatedHighlight.keywords.length > 0) {
	            return {
	                path: aggregatedHighlight.path,
	                query: new RegExp('(' +
	                    aggregatedHighlight.keywords
	                        .map((keyword) => {
	                        return (0, escapeRegexString_1.escapeRegexString)(keyword.trim());
	                    })
	                        .join('|') +
	                    ')'),
	            };
	        }
	        return {
	            path: aggregatedHighlight.path,
	        };
	    });
	};
	highlight$1.highlight = highlight;
	return highlight$1;
}

var isSafeUnquotedExpression = {};

var hasRequiredIsSafeUnquotedExpression;

function requireIsSafeUnquotedExpression () {
	if (hasRequiredIsSafeUnquotedExpression) return isSafeUnquotedExpression;
	hasRequiredIsSafeUnquotedExpression = 1;
	Object.defineProperty(isSafeUnquotedExpression, "__esModule", { value: true });
	isSafeUnquotedExpression.isSafeUnquotedExpression = void 0;
	const isSafeUnquotedExpression$1 = (expression) => {
	    return /^[#$*@A-Z_a-z][#$*.@A-Z_a-z-]*$/.test(expression);
	};
	isSafeUnquotedExpression.isSafeUnquotedExpression = isSafeUnquotedExpression$1;
	return isSafeUnquotedExpression;
}

var parse = {};

var grammar = {};

var hasRequiredGrammar;

function requireGrammar () {
	if (hasRequiredGrammar) return grammar;
	hasRequiredGrammar = 1;
	Object.defineProperty(grammar, "__esModule", { value: true });
	// Generated automatically by nearley, version 2.20.1
	// http://github.com/Hardmath123/nearley
	// Bypasses TS6133. Allow declared but unused functions.
	//
	function id(d) {
	    return d[0];
	}
	const grammar$1 = {
	    Lexer: undefined,
	    ParserRules: [
	        {
	            name: 'main',
	            postprocess: (data) => data[1],
	            symbols: ['_', 'logical_expression', '_'],
	        },
	        { name: '_$ebnf$1', symbols: [] },
	        {
	            name: '_$ebnf$1',
	            postprocess: (d) => d[0].concat([d[1]]),
	            symbols: ['_$ebnf$1', 'whitespace_character'],
	        },
	        { name: '_', postprocess: (data) => data[0].length, symbols: ['_$ebnf$1'] },
	        { name: '__$ebnf$1', symbols: ['whitespace_character'] },
	        {
	            name: '__$ebnf$1',
	            postprocess: (d) => d[0].concat([d[1]]),
	            symbols: ['__$ebnf$1', 'whitespace_character'],
	        },
	        {
	            name: '__',
	            postprocess: (data) => data[0].length,
	            symbols: ['__$ebnf$1'],
	        },
	        { name: 'whitespace_character', postprocess: id, symbols: [/[\t\n\v\f ]/] },
	        { name: 'decimal$ebnf$1', postprocess: id, symbols: [{ literal: '-' }] },
	        { name: 'decimal$ebnf$1', postprocess: () => null, symbols: [] },
	        { name: 'decimal$ebnf$2', symbols: [/\d/] },
	        {
	            name: 'decimal$ebnf$2',
	            postprocess: (d) => d[0].concat([d[1]]),
	            symbols: ['decimal$ebnf$2', /\d/],
	        },
	        { name: 'decimal$ebnf$3$subexpression$1$ebnf$1', symbols: [/\d/] },
	        {
	            name: 'decimal$ebnf$3$subexpression$1$ebnf$1',
	            postprocess: (d) => d[0].concat([d[1]]),
	            symbols: ['decimal$ebnf$3$subexpression$1$ebnf$1', /\d/],
	        },
	        {
	            name: 'decimal$ebnf$3$subexpression$1',
	            symbols: [{ literal: '.' }, 'decimal$ebnf$3$subexpression$1$ebnf$1'],
	        },
	        {
	            name: 'decimal$ebnf$3',
	            postprocess: id,
	            symbols: ['decimal$ebnf$3$subexpression$1'],
	        },
	        { name: 'decimal$ebnf$3', postprocess: () => null, symbols: [] },
	        {
	            name: 'decimal',
	            postprocess: (data) => Number.parseFloat((data[0] || '') +
	                data[1].join('') +
	                (data[2] ? '.' + data[2][1].join('') : '')),
	            symbols: ['decimal$ebnf$1', 'decimal$ebnf$2', 'decimal$ebnf$3'],
	        },
	        { name: 'dqstring$ebnf$1', symbols: [] },
	        {
	            name: 'dqstring$ebnf$1',
	            postprocess: (d) => d[0].concat([d[1]]),
	            symbols: ['dqstring$ebnf$1', 'dstrchar'],
	        },
	        {
	            name: 'dqstring',
	            postprocess: (data) => data[1].join(''),
	            symbols: [{ literal: '"' }, 'dqstring$ebnf$1', { literal: '"' }],
	        },
	        { name: 'sqstring$ebnf$1', symbols: [] },
	        {
	            name: 'sqstring$ebnf$1',
	            postprocess: (d) => d[0].concat([d[1]]),
	            symbols: ['sqstring$ebnf$1', 'sstrchar'],
	        },
	        {
	            name: 'sqstring',
	            postprocess: (data) => data[1].join(''),
	            symbols: [{ literal: "'" }, 'sqstring$ebnf$1', { literal: "'" }],
	        },
	        { name: 'dstrchar', postprocess: id, symbols: [/[^\n"\\]/] },
	        {
	            name: 'dstrchar',
	            postprocess: (data) => JSON.parse('"' + data.join('') + '"'),
	            symbols: [{ literal: '\\' }, 'strescape'],
	        },
	        { name: 'sstrchar', postprocess: id, symbols: [/[^\n'\\]/] },
	        {
	            name: 'sstrchar',
	            postprocess: (data) => JSON.parse('"' + data.join('') + '"'),
	            symbols: [{ literal: '\\' }, 'strescape'],
	        },
	        {
	            name: 'sstrchar$string$1',
	            postprocess: (d) => d.join(''),
	            symbols: [{ literal: '\\' }, { literal: "'" }],
	        },
	        {
	            name: 'sstrchar',
	            postprocess: () => "'",
	            symbols: ['sstrchar$string$1'],
	        },
	        { name: 'strescape', postprocess: id, symbols: [/["/\\bfnrt]/] },
	        {
	            name: 'strescape',
	            postprocess: (data) => data.join(''),
	            symbols: [
	                { literal: 'u' },
	                /[\dA-Fa-f]/,
	                /[\dA-Fa-f]/,
	                /[\dA-Fa-f]/,
	                /[\dA-Fa-f]/,
	            ],
	        },
	        {
	            name: 'logical_expression',
	            postprocess: id,
	            symbols: ['two_op_logical_expression'],
	        },
	        {
	            name: 'two_op_logical_expression',
	            postprocess: (data) => ({
	                left: data[0],
	                location: {
	                    end: data[2].location.end,
	                    start: data[0].location.start,
	                },
	                operator: data[1],
	                right: data[2],
	                type: 'LogicalExpression',
	            }),
	            symbols: [
	                'pre_two_op_logical_expression',
	                'boolean_operator',
	                'post_one_op_logical_expression',
	            ],
	        },
	        {
	            name: 'two_op_logical_expression',
	            postprocess: (data) => ({
	                left: data[0],
	                location: {
	                    end: data[2].location.end,
	                    start: data[0].location.start,
	                },
	                operator: {
	                    operator: 'AND',
	                    type: 'ImplicitBooleanOperator',
	                },
	                right: data[2],
	                type: 'LogicalExpression',
	            }),
	            symbols: [
	                'pre_two_op_implicit_logical_expression',
	                '__',
	                'post_one_op_implicit_logical_expression',
	            ],
	        },
	        {
	            name: 'two_op_logical_expression',
	            postprocess: (d) => d[0],
	            symbols: ['one_op_logical_expression'],
	        },
	        {
	            name: 'pre_two_op_implicit_logical_expression',
	            postprocess: (d) => d[0],
	            symbols: ['two_op_logical_expression'],
	        },
	        {
	            name: 'pre_two_op_implicit_logical_expression',
	            postprocess: (d) => ({
	                expression: d[2],
	                location: { end: d[4].location.start + 1, start: d[0].location.start },
	                type: 'ParenthesizedExpression',
	            }),
	            symbols: [
	                'parentheses_open',
	                '_',
	                'two_op_logical_expression',
	                '_',
	                'parentheses_close',
	            ],
	        },
	        {
	            name: 'post_one_op_implicit_logical_expression',
	            postprocess: (d) => d[0],
	            symbols: ['one_op_logical_expression'],
	        },
	        {
	            name: 'post_one_op_implicit_logical_expression',
	            postprocess: (d) => ({
	                expression: d[2],
	                location: { end: d[4].location.start + 1, start: d[0].location.start },
	                type: 'ParenthesizedExpression',
	            }),
	            symbols: [
	                'parentheses_open',
	                '_',
	                'one_op_logical_expression',
	                '_',
	                'parentheses_close',
	            ],
	        },
	        {
	            name: 'pre_two_op_logical_expression',
	            postprocess: (d) => d[0],
	            symbols: ['two_op_logical_expression', '__'],
	        },
	        {
	            name: 'pre_two_op_logical_expression',
	            postprocess: (d) => ({
	                expression: d[2],
	                location: { end: d[4].location.start + 1, start: d[0].location.start },
	                type: 'ParenthesizedExpression',
	            }),
	            symbols: [
	                'parentheses_open',
	                '_',
	                'two_op_logical_expression',
	                '_',
	                'parentheses_close',
	            ],
	        },
	        {
	            name: 'one_op_logical_expression',
	            postprocess: (d) => ({
	                expression: {
	                    location: {
	                        end: d[0].location.start + 1,
	                        start: d[0].location.start + 1,
	                    },
	                    type: 'EmptyExpression',
	                },
	                location: { end: d[2].location.start + 1, start: d[0].location.start },
	                type: 'ParenthesizedExpression',
	            }),
	            symbols: ['parentheses_open', '_', 'parentheses_close'],
	        },
	        {
	            name: 'one_op_logical_expression',
	            postprocess: (d) => ({
	                expression: d[2],
	                location: { end: d[4].location.start + 1, start: d[0].location.start },
	                type: 'ParenthesizedExpression',
	            }),
	            symbols: [
	                'parentheses_open',
	                '_',
	                'two_op_logical_expression',
	                '_',
	                'parentheses_close',
	            ],
	        },
	        {
	            name: 'one_op_logical_expression$string$1',
	            postprocess: (d) => d.join(''),
	            symbols: [{ literal: 'N' }, { literal: 'O' }, { literal: 'T' }],
	        },
	        {
	            name: 'one_op_logical_expression',
	            postprocess: (data, start) => {
	                return {
	                    location: {
	                        end: data[1].location.end,
	                        start,
	                    },
	                    operand: data[1],
	                    operator: 'NOT',
	                    type: 'UnaryOperator',
	                };
	            },
	            symbols: ['one_op_logical_expression$string$1', 'post_boolean_primary'],
	        },
	        {
	            name: 'one_op_logical_expression',
	            postprocess: (data, start) => {
	                return {
	                    location: {
	                        end: data[1].location.end,
	                        start,
	                    },
	                    operand: data[1],
	                    operator: '-',
	                    type: 'UnaryOperator',
	                };
	            },
	            symbols: [{ literal: '-' }, 'boolean_primary'],
	        },
	        {
	            name: 'one_op_logical_expression',
	            postprocess: (d) => d[0],
	            symbols: ['boolean_primary'],
	        },
	        {
	            name: 'post_one_op_logical_expression',
	            postprocess: (d) => d[1],
	            symbols: ['__', 'one_op_logical_expression'],
	        },
	        {
	            name: 'post_one_op_logical_expression',
	            postprocess: (d) => ({
	                expression: d[2],
	                location: { end: d[4].location + 1, start: d[0].location },
	                type: 'ParenthesizedExpression',
	            }),
	            symbols: [
	                'parentheses_open',
	                '_',
	                'one_op_logical_expression',
	                '_',
	                'parentheses_close',
	            ],
	        },
	        {
	            name: 'parentheses_open',
	            postprocess: (data, start) => ({ location: { start } }),
	            symbols: [{ literal: '(' }],
	        },
	        {
	            name: 'parentheses_close',
	            postprocess: (data, start) => ({ location: { start } }),
	            symbols: [{ literal: ')' }],
	        },
	        {
	            name: 'boolean_operator$string$1',
	            postprocess: (d) => d.join(''),
	            symbols: [{ literal: 'O' }, { literal: 'R' }],
	        },
	        {
	            name: 'boolean_operator',
	            postprocess: (data, start) => ({
	                location: { end: start + 2, start },
	                operator: 'OR',
	                type: 'BooleanOperator',
	            }),
	            symbols: ['boolean_operator$string$1'],
	        },
	        {
	            name: 'boolean_operator$string$2',
	            postprocess: (d) => d.join(''),
	            symbols: [{ literal: 'A' }, { literal: 'N' }, { literal: 'D' }],
	        },
	        {
	            name: 'boolean_operator',
	            postprocess: (data, start) => ({
	                location: { end: start + 3, start },
	                operator: 'AND',
	                type: 'BooleanOperator',
	            }),
	            symbols: ['boolean_operator$string$2'],
	        },
	        { name: 'boolean_primary', postprocess: id, symbols: ['tag_expression'] },
	        {
	            name: 'post_boolean_primary',
	            postprocess: (d) => ({
	                expression: d[3],
	                location: { end: d[5].location.start + 1, start: d[1].location.start },
	                type: 'ParenthesizedExpression',
	            }),
	            symbols: [
	                '__',
	                'parentheses_open',
	                '_',
	                'two_op_logical_expression',
	                '_',
	                'parentheses_close',
	            ],
	        },
	        {
	            name: 'post_boolean_primary',
	            postprocess: (d) => d[1],
	            symbols: ['__', 'boolean_primary'],
	        },
	        {
	            name: 'tag_expression',
	            postprocess: (data, start) => {
	                const field = {
	                    location: data[0].location,
	                    name: data[0].name,
	                    path: data[0].name.split('.').filter(Boolean),
	                    quoted: data[0].quoted,
	                    quotes: data[0].quotes,
	                    type: 'Field',
	                };
	                if (!data[0].quotes) {
	                    delete field.quotes;
	                }
	                return {
	                    field,
	                    location: {
	                        end: data[2].expression.location.end,
	                        start,
	                    },
	                    operator: data[1],
	                    ...data[2],
	                };
	            },
	            symbols: ['field', 'comparison_operator', 'expression'],
	        },
	        {
	            name: 'tag_expression',
	            postprocess: (data, start) => {
	                const field = {
	                    location: data[0].location,
	                    name: data[0].name,
	                    path: data[0].name.split('.').filter(Boolean),
	                    quoted: data[0].quoted,
	                    quotes: data[0].quotes,
	                    type: 'Field',
	                };
	                if (!data[0].quotes) {
	                    delete field.quotes;
	                }
	                return {
	                    expression: {
	                        location: {
	                            end: data[1].location.end,
	                            start: data[1].location.end,
	                        },
	                        type: 'EmptyExpression',
	                    },
	                    field,
	                    location: {
	                        end: data[1].location.end,
	                        start,
	                    },
	                    operator: data[1],
	                    type: 'Tag',
	                };
	            },
	            symbols: ['field', 'comparison_operator'],
	        },
	        {
	            name: 'tag_expression',
	            postprocess: (data, start) => {
	                return {
	                    field: { type: 'ImplicitField' },
	                    location: { end: data[0].expression.location.end, start },
	                    ...data[0],
	                };
	            },
	            symbols: ['expression'],
	        },
	        { name: 'field$ebnf$1', symbols: [] },
	        {
	            name: 'field$ebnf$1',
	            postprocess: (d) => d[0].concat([d[1]]),
	            symbols: ['field$ebnf$1', /[\w$.]/],
	        },
	        {
	            name: 'field',
	            postprocess: (data, start) => ({
	                location: { end: start + (data[0] + data[1].join('')).length, start },
	                name: data[0] + data[1].join(''),
	                quoted: false,
	                type: 'LiteralExpression',
	            }),
	            symbols: [/[$A-Z_a-z]/, 'field$ebnf$1'],
	        },
	        {
	            name: 'field',
	            postprocess: (data, start) => ({
	                location: { end: start + data[0].length + 2, start },
	                name: data[0],
	                quoted: true,
	                quotes: 'single',
	                type: 'LiteralExpression',
	            }),
	            symbols: ['sqstring'],
	        },
	        {
	            name: 'field',
	            postprocess: (data, start) => ({
	                location: { end: start + data[0].length + 2, start },
	                name: data[0],
	                quoted: true,
	                quotes: 'double',
	                type: 'LiteralExpression',
	            }),
	            symbols: ['dqstring'],
	        },
	        {
	            name: 'expression',
	            postprocess: (data, start) => ({
	                expression: {
	                    location: { end: start + data.join('').length, start },
	                    quoted: false,
	                    type: 'LiteralExpression',
	                    value: Number(data.join('')),
	                },
	                type: 'Tag',
	            }),
	            symbols: ['decimal'],
	        },
	        {
	            name: 'expression',
	            postprocess: (data, start) => ({
	                expression: {
	                    location: { end: start + data.join('').length, start },
	                    type: 'RegexExpression',
	                    value: data.join(''),
	                },
	                type: 'Tag',
	            }),
	            symbols: ['regex'],
	        },
	        { name: 'expression', postprocess: (data) => data[0], symbols: ['range'] },
	        {
	            name: 'expression',
	            postprocess: (data, start, reject) => {
	                const value = data.join('');
	                if (data[0] === 'AND' || data[0] === 'OR' || data[0] === 'NOT') {
	                    return reject;
	                }
	                let normalizedValue;
	                if (value === 'true') {
	                    normalizedValue = true;
	                }
	                else if (value === 'false') {
	                    normalizedValue = false;
	                }
	                else if (value === 'null') {
	                    normalizedValue = null;
	                }
	                else {
	                    normalizedValue = value;
	                }
	                return {
	                    expression: {
	                        location: {
	                            end: start + value.length,
	                            start,
	                        },
	                        quoted: false,
	                        type: 'LiteralExpression',
	                        value: normalizedValue,
	                    },
	                    type: 'Tag',
	                };
	            },
	            symbols: ['unquoted_value'],
	        },
	        {
	            name: 'expression',
	            postprocess: (data, start) => ({
	                expression: {
	                    location: { end: start + data.join('').length + 2, start },
	                    quoted: true,
	                    quotes: 'single',
	                    type: 'LiteralExpression',
	                    value: data.join(''),
	                },
	                type: 'Tag',
	            }),
	            symbols: ['sqstring'],
	        },
	        {
	            name: 'expression',
	            postprocess: (data, start) => ({
	                expression: {
	                    location: { end: start + data.join('').length + 2, start },
	                    quoted: true,
	                    quotes: 'double',
	                    type: 'LiteralExpression',
	                    value: data.join(''),
	                },
	                type: 'Tag',
	            }),
	            symbols: ['dqstring'],
	        },
	        {
	            name: 'range$string$1',
	            postprocess: (d) => d.join(''),
	            symbols: [
	                { literal: ' ' },
	                { literal: 'T' },
	                { literal: 'O' },
	                { literal: ' ' },
	            ],
	        },
	        {
	            name: 'range',
	            postprocess: (data, start) => {
	                return {
	                    expression: {
	                        location: {
	                            end: data[4].location.start + 1,
	                            start: data[0].location.start,
	                        },
	                        range: {
	                            max: data[3],
	                            maxInclusive: data[4].inclusive,
	                            min: data[1],
	                            minInclusive: data[0].inclusive,
	                        },
	                        type: 'RangeExpression',
	                    },
	                    location: {
	                        start,
	                    },
	                    type: 'Tag',
	                };
	            },
	            symbols: [
	                'range_open',
	                'decimal',
	                'range$string$1',
	                'decimal',
	                'range_close',
	            ],
	        },
	        {
	            name: 'range_open',
	            postprocess: (data, start) => ({ inclusive: true, location: { start } }),
	            symbols: [{ literal: '[' }],
	        },
	        {
	            name: 'range_open',
	            postprocess: (data, start) => ({ inclusive: false, location: { start } }),
	            symbols: [{ literal: '{' }],
	        },
	        {
	            name: 'range_close',
	            postprocess: (data, start) => ({ inclusive: true, location: { start } }),
	            symbols: [{ literal: ']' }],
	        },
	        {
	            name: 'range_close',
	            postprocess: (data, start) => ({ inclusive: false, location: { start } }),
	            symbols: [{ literal: '}' }],
	        },
	        {
	            name: 'comparison_operator$subexpression$1',
	            symbols: [{ literal: ':' }],
	        },
	        {
	            name: 'comparison_operator$subexpression$1$string$1',
	            postprocess: (d) => d.join(''),
	            symbols: [{ literal: ':' }, { literal: '=' }],
	        },
	        {
	            name: 'comparison_operator$subexpression$1',
	            symbols: ['comparison_operator$subexpression$1$string$1'],
	        },
	        {
	            name: 'comparison_operator$subexpression$1$string$2',
	            postprocess: (d) => d.join(''),
	            symbols: [{ literal: ':' }, { literal: '>' }],
	        },
	        {
	            name: 'comparison_operator$subexpression$1',
	            symbols: ['comparison_operator$subexpression$1$string$2'],
	        },
	        {
	            name: 'comparison_operator$subexpression$1$string$3',
	            postprocess: (d) => d.join(''),
	            symbols: [{ literal: ':' }, { literal: '<' }],
	        },
	        {
	            name: 'comparison_operator$subexpression$1',
	            symbols: ['comparison_operator$subexpression$1$string$3'],
	        },
	        {
	            name: 'comparison_operator$subexpression$1$string$4',
	            postprocess: (d) => d.join(''),
	            symbols: [{ literal: ':' }, { literal: '>' }, { literal: '=' }],
	        },
	        {
	            name: 'comparison_operator$subexpression$1',
	            symbols: ['comparison_operator$subexpression$1$string$4'],
	        },
	        {
	            name: 'comparison_operator$subexpression$1$string$5',
	            postprocess: (d) => d.join(''),
	            symbols: [{ literal: ':' }, { literal: '<' }, { literal: '=' }],
	        },
	        {
	            name: 'comparison_operator$subexpression$1',
	            symbols: ['comparison_operator$subexpression$1$string$5'],
	        },
	        {
	            name: 'comparison_operator',
	            postprocess: (data, start) => ({
	                location: { end: start + data[0][0].length, start },
	                operator: data[0][0],
	                type: 'ComparisonOperator',
	            }),
	            symbols: ['comparison_operator$subexpression$1'],
	        },
	        {
	            name: 'regex',
	            postprocess: (d) => d.join(''),
	            symbols: ['regex_body', 'regex_flags'],
	        },
	        { name: 'regex_body$ebnf$1', symbols: [] },
	        {
	            name: 'regex_body$ebnf$1',
	            postprocess: (d) => d[0].concat([d[1]]),
	            symbols: ['regex_body$ebnf$1', 'regex_body_char'],
	        },
	        {
	            name: 'regex_body',
	            postprocess: (data) => '/' + data[1].join('') + '/',
	            symbols: [{ literal: '/' }, 'regex_body$ebnf$1', { literal: '/' }],
	        },
	        { name: 'regex_body_char', postprocess: id, symbols: [/[^\\]/] },
	        {
	            name: 'regex_body_char',
	            postprocess: (d) => '\\' + d[1],
	            symbols: [{ literal: '\\' }, /[^\\]/],
	        },
	        { name: 'regex_flags', symbols: [] },
	        { name: 'regex_flags$ebnf$1', symbols: [/[dgimsuy]/] },
	        {
	            name: 'regex_flags$ebnf$1',
	            postprocess: (d) => d[0].concat([d[1]]),
	            symbols: ['regex_flags$ebnf$1', /[dgimsuy]/],
	        },
	        {
	            name: 'regex_flags',
	            postprocess: (d) => d[0].join(''),
	            symbols: ['regex_flags$ebnf$1'],
	        },
	        { name: 'unquoted_value$ebnf$1', symbols: [] },
	        {
	            name: 'unquoted_value$ebnf$1',
	            postprocess: (d) => d[0].concat([d[1]]),
	            symbols: ['unquoted_value$ebnf$1', /[\w#$*.?@\u0080-\uFFFF\-]/],
	        },
	        {
	            name: 'unquoted_value',
	            postprocess: (d) => d[0] + d[1].join(''),
	            symbols: [/[#$*?@A-Z_a-z\u0080-\uFFFF]/, 'unquoted_value$ebnf$1'],
	        },
	    ],
	    ParserStart: 'main',
	};
	grammar.default = grammar$1;
	return grammar;
}

var hydrateAst = {};

var createGetValueFunctionBody = {};

var isSafePath = {};

var hasRequiredIsSafePath;

function requireIsSafePath () {
	if (hasRequiredIsSafePath) return isSafePath;
	hasRequiredIsSafePath = 1;
	Object.defineProperty(isSafePath, "__esModule", { value: true });
	isSafePath.isSafePath = void 0;
	const SAFE_PATH_RULE = /^(\.(?:[_a-zA-Z]\w*|\0|[1-9]\d*))+$/u;
	const isSafePath$1 = (path) => {
	    return SAFE_PATH_RULE.test(path);
	};
	isSafePath.isSafePath = isSafePath$1;
	return isSafePath;
}

var hasRequiredCreateGetValueFunctionBody;

function requireCreateGetValueFunctionBody () {
	if (hasRequiredCreateGetValueFunctionBody) return createGetValueFunctionBody;
	hasRequiredCreateGetValueFunctionBody = 1;
	Object.defineProperty(createGetValueFunctionBody, "__esModule", { value: true });
	createGetValueFunctionBody.createGetValueFunctionBody = void 0;
	const isSafePath_1 = requireIsSafePath();
	const createGetValueFunctionBody$1 = (path) => {
	    if (!(0, isSafePath_1.isSafePath)(path)) {
	        throw new Error('Unsafe path.');
	    }
	    const body = 'return subject' + path;
	    return body.replaceAll(/(\.(\d+))/g, '.[$2]').replaceAll('.', '?.');
	};
	createGetValueFunctionBody.createGetValueFunctionBody = createGetValueFunctionBody$1;
	return createGetValueFunctionBody;
}

var hasRequiredHydrateAst;

function requireHydrateAst () {
	if (hasRequiredHydrateAst) return hydrateAst;
	hasRequiredHydrateAst = 1;
	(function (exports) {
		/* eslint-disable no-new-func */
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.hydrateAst = void 0;
		const createGetValueFunctionBody_1 = requireCreateGetValueFunctionBody();
		const isSafePath_1 = requireIsSafePath();
		const hydrateAst = (subject) => {
		    const newSubject = {
		        ...subject,
		    };
		    if (subject.type === 'Tag' &&
		        subject.field.type === 'Field' &&
		        'field' in subject &&
		        (0, isSafePath_1.isSafePath)(subject.field.name)) {
		        newSubject.getValue = new Function('subject', (0, createGetValueFunctionBody_1.createGetValueFunctionBody)(subject.field.name));
		    }
		    if ('left' in subject) {
		        newSubject.left = (0, exports.hydrateAst)(subject.left);
		    }
		    if ('right' in subject) {
		        newSubject.right = (0, exports.hydrateAst)(subject.right);
		    }
		    if ('operand' in subject) {
		        newSubject.operand = (0, exports.hydrateAst)(subject.operand);
		    }
		    return newSubject;
		};
		exports.hydrateAst = hydrateAst; 
	} (hydrateAst));
	return hydrateAst;
}

var nearley$1 = {exports: {}};

var nearley = nearley$1.exports;

var hasRequiredNearley;

function requireNearley () {
	if (hasRequiredNearley) return nearley$1.exports;
	hasRequiredNearley = 1;
	(function (module) {
		(function(root, factory) {
		    if (module.exports) {
		        module.exports = factory();
		    } else {
		        root.nearley = factory();
		    }
		}(nearley, function() {

		    function Rule(name, symbols, postprocess) {
		        this.id = ++Rule.highestId;
		        this.name = name;
		        this.symbols = symbols;        // a list of literal | regex class | nonterminal
		        this.postprocess = postprocess;
		        return this;
		    }
		    Rule.highestId = 0;

		    Rule.prototype.toString = function(withCursorAt) {
		        var symbolSequence = (typeof withCursorAt === "undefined")
		                             ? this.symbols.map(getSymbolShortDisplay).join(' ')
		                             : (   this.symbols.slice(0, withCursorAt).map(getSymbolShortDisplay).join(' ')
		                                 + " ● "
		                                 + this.symbols.slice(withCursorAt).map(getSymbolShortDisplay).join(' ')     );
		        return this.name + " → " + symbolSequence;
		    };


		    // a State is a rule at a position from a given starting point in the input stream (reference)
		    function State(rule, dot, reference, wantedBy) {
		        this.rule = rule;
		        this.dot = dot;
		        this.reference = reference;
		        this.data = [];
		        this.wantedBy = wantedBy;
		        this.isComplete = this.dot === rule.symbols.length;
		    }

		    State.prototype.toString = function() {
		        return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
		    };

		    State.prototype.nextState = function(child) {
		        var state = new State(this.rule, this.dot + 1, this.reference, this.wantedBy);
		        state.left = this;
		        state.right = child;
		        if (state.isComplete) {
		            state.data = state.build();
		            // Having right set here will prevent the right state and its children
		            // form being garbage collected
		            state.right = undefined;
		        }
		        return state;
		    };

		    State.prototype.build = function() {
		        var children = [];
		        var node = this;
		        do {
		            children.push(node.right.data);
		            node = node.left;
		        } while (node.left);
		        children.reverse();
		        return children;
		    };

		    State.prototype.finish = function() {
		        if (this.rule.postprocess) {
		            this.data = this.rule.postprocess(this.data, this.reference, Parser.fail);
		        }
		    };


		    function Column(grammar, index) {
		        this.grammar = grammar;
		        this.index = index;
		        this.states = [];
		        this.wants = {}; // states indexed by the non-terminal they expect
		        this.scannable = []; // list of states that expect a token
		        this.completed = {}; // states that are nullable
		    }


		    Column.prototype.process = function(nextColumn) {
		        var states = this.states;
		        var wants = this.wants;
		        var completed = this.completed;

		        for (var w = 0; w < states.length; w++) { // nb. we push() during iteration
		            var state = states[w];

		            if (state.isComplete) {
		                state.finish();
		                if (state.data !== Parser.fail) {
		                    // complete
		                    var wantedBy = state.wantedBy;
		                    for (var i = wantedBy.length; i--; ) { // this line is hot
		                        var left = wantedBy[i];
		                        this.complete(left, state);
		                    }

		                    // special-case nullables
		                    if (state.reference === this.index) {
		                        // make sure future predictors of this rule get completed.
		                        var exp = state.rule.name;
		                        (this.completed[exp] = this.completed[exp] || []).push(state);
		                    }
		                }

		            } else {
		                // queue scannable states
		                var exp = state.rule.symbols[state.dot];
		                if (typeof exp !== 'string') {
		                    this.scannable.push(state);
		                    continue;
		                }

		                // predict
		                if (wants[exp]) {
		                    wants[exp].push(state);

		                    if (completed.hasOwnProperty(exp)) {
		                        var nulls = completed[exp];
		                        for (var i = 0; i < nulls.length; i++) {
		                            var right = nulls[i];
		                            this.complete(state, right);
		                        }
		                    }
		                } else {
		                    wants[exp] = [state];
		                    this.predict(exp);
		                }
		            }
		        }
		    };

		    Column.prototype.predict = function(exp) {
		        var rules = this.grammar.byName[exp] || [];

		        for (var i = 0; i < rules.length; i++) {
		            var r = rules[i];
		            var wantedBy = this.wants[exp];
		            var s = new State(r, 0, this.index, wantedBy);
		            this.states.push(s);
		        }
		    };

		    Column.prototype.complete = function(left, right) {
		        var copy = left.nextState(right);
		        this.states.push(copy);
		    };


		    function Grammar(rules, start) {
		        this.rules = rules;
		        this.start = start || this.rules[0].name;
		        var byName = this.byName = {};
		        this.rules.forEach(function(rule) {
		            if (!byName.hasOwnProperty(rule.name)) {
		                byName[rule.name] = [];
		            }
		            byName[rule.name].push(rule);
		        });
		    }

		    // So we can allow passing (rules, start) directly to Parser for backwards compatibility
		    Grammar.fromCompiled = function(rules, start) {
		        var lexer = rules.Lexer;
		        if (rules.ParserStart) {
		          start = rules.ParserStart;
		          rules = rules.ParserRules;
		        }
		        var rules = rules.map(function (r) { return (new Rule(r.name, r.symbols, r.postprocess)); });
		        var g = new Grammar(rules, start);
		        g.lexer = lexer; // nb. storing lexer on Grammar is iffy, but unavoidable
		        return g;
		    };


		    function StreamLexer() {
		      this.reset("");
		    }

		    StreamLexer.prototype.reset = function(data, state) {
		        this.buffer = data;
		        this.index = 0;
		        this.line = state ? state.line : 1;
		        this.lastLineBreak = state ? -state.col : 0;
		    };

		    StreamLexer.prototype.next = function() {
		        if (this.index < this.buffer.length) {
		            var ch = this.buffer[this.index++];
		            if (ch === '\n') {
		              this.line += 1;
		              this.lastLineBreak = this.index;
		            }
		            return {value: ch};
		        }
		    };

		    StreamLexer.prototype.save = function() {
		      return {
		        line: this.line,
		        col: this.index - this.lastLineBreak,
		      }
		    };

		    StreamLexer.prototype.formatError = function(token, message) {
		        // nb. this gets called after consuming the offending token,
		        // so the culprit is index-1
		        var buffer = this.buffer;
		        if (typeof buffer === 'string') {
		            var lines = buffer
		                .split("\n")
		                .slice(
		                    Math.max(0, this.line - 5), 
		                    this.line
		                );

		            var nextLineBreak = buffer.indexOf('\n', this.index);
		            if (nextLineBreak === -1) nextLineBreak = buffer.length;
		            var col = this.index - this.lastLineBreak;
		            var lastLineDigits = String(this.line).length;
		            message += " at line " + this.line + " col " + col + ":\n\n";
		            message += lines
		                .map(function(line, i) {
		                    return pad(this.line - lines.length + i + 1, lastLineDigits) + " " + line;
		                }, this)
		                .join("\n");
		            message += "\n" + pad("", lastLineDigits + col) + "^\n";
		            return message;
		        } else {
		            return message + " at index " + (this.index - 1);
		        }

		        function pad(n, length) {
		            var s = String(n);
		            return Array(length - s.length + 1).join(" ") + s;
		        }
		    };

		    function Parser(rules, start, options) {
		        if (rules instanceof Grammar) {
		            var grammar = rules;
		            var options = start;
		        } else {
		            var grammar = Grammar.fromCompiled(rules, start);
		        }
		        this.grammar = grammar;

		        // Read options
		        this.options = {
		            keepHistory: false,
		            lexer: grammar.lexer || new StreamLexer,
		        };
		        for (var key in (options || {})) {
		            this.options[key] = options[key];
		        }

		        // Setup lexer
		        this.lexer = this.options.lexer;
		        this.lexerState = undefined;

		        // Setup a table
		        var column = new Column(grammar, 0);
		        this.table = [column];

		        // I could be expecting anything.
		        column.wants[grammar.start] = [];
		        column.predict(grammar.start);
		        // TODO what if start rule is nullable?
		        column.process();
		        this.current = 0; // token index
		    }

		    // create a reserved token for indicating a parse fail
		    Parser.fail = {};

		    Parser.prototype.feed = function(chunk) {
		        var lexer = this.lexer;
		        lexer.reset(chunk, this.lexerState);

		        var token;
		        while (true) {
		            try {
		                token = lexer.next();
		                if (!token) {
		                    break;
		                }
		            } catch (e) {
		                // Create the next column so that the error reporter
		                // can display the correctly predicted states.
		                var nextColumn = new Column(this.grammar, this.current + 1);
		                this.table.push(nextColumn);
		                var err = new Error(this.reportLexerError(e));
		                err.offset = this.current;
		                err.token = e.token;
		                throw err;
		            }
		            // We add new states to table[current+1]
		            var column = this.table[this.current];

		            // GC unused states
		            if (!this.options.keepHistory) {
		                delete this.table[this.current - 1];
		            }

		            var n = this.current + 1;
		            var nextColumn = new Column(this.grammar, n);
		            this.table.push(nextColumn);

		            // Advance all tokens that expect the symbol
		            var literal = token.text !== undefined ? token.text : token.value;
		            var value = lexer.constructor === StreamLexer ? token.value : token;
		            var scannable = column.scannable;
		            for (var w = scannable.length; w--; ) {
		                var state = scannable[w];
		                var expect = state.rule.symbols[state.dot];
		                // Try to consume the token
		                // either regex or literal
		                if (expect.test ? expect.test(value) :
		                    expect.type ? expect.type === token.type
		                                : expect.literal === literal) {
		                    // Add it
		                    var next = state.nextState({data: value, token: token, isToken: true, reference: n - 1});
		                    nextColumn.states.push(next);
		                }
		            }

		            // Next, for each of the rules, we either
		            // (a) complete it, and try to see if the reference row expected that
		            //     rule
		            // (b) predict the next nonterminal it expects by adding that
		            //     nonterminal's start state
		            // To prevent duplication, we also keep track of rules we have already
		            // added

		            nextColumn.process();

		            // If needed, throw an error:
		            if (nextColumn.states.length === 0) {
		                // No states at all! This is not good.
		                var err = new Error(this.reportError(token));
		                err.offset = this.current;
		                err.token = token;
		                throw err;
		            }

		            // maybe save lexer state
		            if (this.options.keepHistory) {
		              column.lexerState = lexer.save();
		            }

		            this.current++;
		        }
		        if (column) {
		          this.lexerState = lexer.save();
		        }

		        // Incrementally keep track of results
		        this.results = this.finish();

		        // Allow chaining, for whatever it's worth
		        return this;
		    };

		    Parser.prototype.reportLexerError = function(lexerError) {
		        var tokenDisplay, lexerMessage;
		        // Planning to add a token property to moo's thrown error
		        // even on erroring tokens to be used in error display below
		        var token = lexerError.token;
		        if (token) {
		            tokenDisplay = "input " + JSON.stringify(token.text[0]) + " (lexer error)";
		            lexerMessage = this.lexer.formatError(token, "Syntax error");
		        } else {
		            tokenDisplay = "input (lexer error)";
		            lexerMessage = lexerError.message;
		        }
		        return this.reportErrorCommon(lexerMessage, tokenDisplay);
		    };

		    Parser.prototype.reportError = function(token) {
		        var tokenDisplay = (token.type ? token.type + " token: " : "") + JSON.stringify(token.value !== undefined ? token.value : token);
		        var lexerMessage = this.lexer.formatError(token, "Syntax error");
		        return this.reportErrorCommon(lexerMessage, tokenDisplay);
		    };

		    Parser.prototype.reportErrorCommon = function(lexerMessage, tokenDisplay) {
		        var lines = [];
		        lines.push(lexerMessage);
		        var lastColumnIndex = this.table.length - 2;
		        var lastColumn = this.table[lastColumnIndex];
		        var expectantStates = lastColumn.states
		            .filter(function(state) {
		                var nextSymbol = state.rule.symbols[state.dot];
		                return nextSymbol && typeof nextSymbol !== "string";
		            });

		        if (expectantStates.length === 0) {
		            lines.push('Unexpected ' + tokenDisplay + '. I did not expect any more input. Here is the state of my parse table:\n');
		            this.displayStateStack(lastColumn.states, lines);
		        } else {
		            lines.push('Unexpected ' + tokenDisplay + '. Instead, I was expecting to see one of the following:\n');
		            // Display a "state stack" for each expectant state
		            // - which shows you how this state came to be, step by step.
		            // If there is more than one derivation, we only display the first one.
		            var stateStacks = expectantStates
		                .map(function(state) {
		                    return this.buildFirstStateStack(state, []) || [state];
		                }, this);
		            // Display each state that is expecting a terminal symbol next.
		            stateStacks.forEach(function(stateStack) {
		                var state = stateStack[0];
		                var nextSymbol = state.rule.symbols[state.dot];
		                var symbolDisplay = this.getSymbolDisplay(nextSymbol);
		                lines.push('A ' + symbolDisplay + ' based on:');
		                this.displayStateStack(stateStack, lines);
		            }, this);
		        }
		        lines.push("");
		        return lines.join("\n");
		    };
		    
		    Parser.prototype.displayStateStack = function(stateStack, lines) {
		        var lastDisplay;
		        var sameDisplayCount = 0;
		        for (var j = 0; j < stateStack.length; j++) {
		            var state = stateStack[j];
		            var display = state.rule.toString(state.dot);
		            if (display === lastDisplay) {
		                sameDisplayCount++;
		            } else {
		                if (sameDisplayCount > 0) {
		                    lines.push('    ^ ' + sameDisplayCount + ' more lines identical to this');
		                }
		                sameDisplayCount = 0;
		                lines.push('    ' + display);
		            }
		            lastDisplay = display;
		        }
		    };

		    Parser.prototype.getSymbolDisplay = function(symbol) {
		        return getSymbolLongDisplay(symbol);
		    };

		    /*
		    Builds a the first state stack. You can think of a state stack as the call stack
		    of the recursive-descent parser which the Nearley parse algorithm simulates.
		    A state stack is represented as an array of state objects. Within a
		    state stack, the first item of the array will be the starting
		    state, with each successive item in the array going further back into history.

		    This function needs to be given a starting state and an empty array representing
		    the visited states, and it returns an single state stack.

		    */
		    Parser.prototype.buildFirstStateStack = function(state, visited) {
		        if (visited.indexOf(state) !== -1) {
		            // Found cycle, return null
		            // to eliminate this path from the results, because
		            // we don't know how to display it meaningfully
		            return null;
		        }
		        if (state.wantedBy.length === 0) {
		            return [state];
		        }
		        var prevState = state.wantedBy[0];
		        var childVisited = [state].concat(visited);
		        var childResult = this.buildFirstStateStack(prevState, childVisited);
		        if (childResult === null) {
		            return null;
		        }
		        return [state].concat(childResult);
		    };

		    Parser.prototype.save = function() {
		        var column = this.table[this.current];
		        column.lexerState = this.lexerState;
		        return column;
		    };

		    Parser.prototype.restore = function(column) {
		        var index = column.index;
		        this.current = index;
		        this.table[index] = column;
		        this.table.splice(index + 1);
		        this.lexerState = column.lexerState;

		        // Incrementally keep track of results
		        this.results = this.finish();
		    };

		    // nb. deprecated: use save/restore instead!
		    Parser.prototype.rewind = function(index) {
		        if (!this.options.keepHistory) {
		            throw new Error('set option `keepHistory` to enable rewinding')
		        }
		        // nb. recall column (table) indicies fall between token indicies.
		        //        col 0   --   token 0   --   col 1
		        this.restore(this.table[index]);
		    };

		    Parser.prototype.finish = function() {
		        // Return the possible parsings
		        var considerations = [];
		        var start = this.grammar.start;
		        var column = this.table[this.table.length - 1];
		        column.states.forEach(function (t) {
		            if (t.rule.name === start
		                    && t.dot === t.rule.symbols.length
		                    && t.reference === 0
		                    && t.data !== Parser.fail) {
		                considerations.push(t);
		            }
		        });
		        return considerations.map(function(c) {return c.data; });
		    };

		    function getSymbolLongDisplay(symbol) {
		        var type = typeof symbol;
		        if (type === "string") {
		            return symbol;
		        } else if (type === "object") {
		            if (symbol.literal) {
		                return JSON.stringify(symbol.literal);
		            } else if (symbol instanceof RegExp) {
		                return 'character matching ' + symbol;
		            } else if (symbol.type) {
		                return symbol.type + ' token';
		            } else if (symbol.test) {
		                return 'token matching ' + String(symbol.test);
		            } else {
		                throw new Error('Unknown symbol type: ' + symbol);
		            }
		        }
		    }

		    function getSymbolShortDisplay(symbol) {
		        var type = typeof symbol;
		        if (type === "string") {
		            return symbol;
		        } else if (type === "object") {
		            if (symbol.literal) {
		                return JSON.stringify(symbol.literal);
		            } else if (symbol instanceof RegExp) {
		                return symbol.toString();
		            } else if (symbol.type) {
		                return '%' + symbol.type;
		            } else if (symbol.test) {
		                return '<' + String(symbol.test) + '>';
		            } else {
		                throw new Error('Unknown symbol type: ' + symbol);
		            }
		        }
		    }

		    return {
		        Parser: Parser,
		        Grammar: Grammar,
		        Rule: Rule,
		    };

		})); 
	} (nearley$1));
	return nearley$1.exports;
}

var hasRequiredParse;

function requireParse () {
	if (hasRequiredParse) return parse;
	hasRequiredParse = 1;
	var __importDefault = (parse && parse.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(parse, "__esModule", { value: true });
	parse.parse = void 0;
	const errors_1 = requireErrors();
	const grammar_1 = __importDefault(requireGrammar());
	const hydrateAst_1 = requireHydrateAst();
	const nearley_1 = __importDefault(requireNearley());
	const rules = nearley_1.default.Grammar.fromCompiled(grammar_1.default);
	const MESSAGE_RULE = /Syntax error at line (?<line>\d+) col (?<column>\d+)/;
	const parse$1 = (query) => {
	    if (query.trim() === '') {
	        return {
	            location: {
	                end: 0,
	                start: 0,
	            },
	            type: 'EmptyExpression',
	        };
	    }
	    const parser = new nearley_1.default.Parser(rules);
	    let results;
	    try {
	        results = parser.feed(query).results;
	    }
	    catch (error) {
	        if (typeof (error === null || error === void 0 ? void 0 : error.message) === 'string' &&
	            typeof (error === null || error === void 0 ? void 0 : error.offset) === 'number') {
	            const match = error.message.match(MESSAGE_RULE);
	            if (!match) {
	                throw error;
	            }
	            throw new errors_1.SyntaxError(`Syntax error at line ${match.groups.line} column ${match.groups.column}`, error.offset, Number(match.groups.line), Number(match.groups.column));
	        }
	        throw error;
	    }
	    if (results.length === 0) {
	        throw new Error('Found no parsings.');
	    }
	    if (results.length > 1) {
	        const firstResult = JSON.stringify(results[0]);
	        for (const result of results) {
	            // Only throw if the results are different.
	            if (JSON.stringify(result) !== firstResult) {
	                throw new errors_1.LiqeError('Ambiguous results.');
	            }
	        }
	    }
	    const hydratedAst = (0, hydrateAst_1.hydrateAst)(results[0]);
	    return hydratedAst;
	};
	parse.parse = parse$1;
	return parse;
}

var serialize = {};

var hasRequiredSerialize;

function requireSerialize () {
	if (hasRequiredSerialize) return serialize;
	hasRequiredSerialize = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.serialize = void 0;
		const quote = (value, quotes) => {
		    if (quotes === 'double') {
		        return `"${value}"`;
		    }
		    if (quotes === 'single') {
		        return `'${value}'`;
		    }
		    return value;
		};
		const serializeExpression = (expression) => {
		    if (expression.type === 'LiteralExpression') {
		        if (expression.quoted && typeof expression.value === 'string') {
		            return quote(expression.value, expression.quotes);
		        }
		        return String(expression.value);
		    }
		    if (expression.type === 'RegexExpression') {
		        return String(expression.value);
		    }
		    if (expression.type === 'RangeExpression') {
		        const { max, maxInclusive, min, minInclusive } = expression.range;
		        return `${minInclusive ? '[' : '{'}${min} TO ${max}${maxInclusive ? ']' : '}'}`;
		    }
		    if (expression.type === 'EmptyExpression') {
		        return '';
		    }
		    throw new Error('Unexpected AST type.');
		};
		const serializeTag = (ast) => {
		    if (ast.type !== 'Tag') {
		        throw new Error('Expected a tag expression.');
		    }
		    const { expression, field, operator } = ast;
		    if (field.type === 'ImplicitField') {
		        return serializeExpression(expression);
		    }
		    const left = field.quoted ? quote(field.name, field.quotes) : field.name;
		    const patEnd = ' '.repeat(expression.location.start - operator.location.end);
		    return left + operator.operator + patEnd + serializeExpression(expression);
		};
		const serialize = (ast) => {
		    if (ast.type === 'ParenthesizedExpression') {
		        if (!('location' in ast.expression)) {
		            throw new Error('Expected location in expression.');
		        }
		        if (!ast.location.end) {
		            throw new Error('Expected location end.');
		        }
		        const patStart = ' '.repeat(ast.expression.location.start - (ast.location.start + 1));
		        const patEnd = ' '.repeat(ast.location.end - ast.expression.location.end - 1);
		        return `(${patStart}${(0, exports.serialize)(ast.expression)}${patEnd})`;
		    }
		    if (ast.type === 'Tag') {
		        return serializeTag(ast);
		    }
		    if (ast.type === 'LogicalExpression') {
		        let operator = '';
		        if (ast.operator.type === 'BooleanOperator') {
		            operator += ' '.repeat(ast.operator.location.start - ast.left.location.end);
		            operator += ast.operator.operator;
		            operator += ' '.repeat(ast.right.location.start - ast.operator.location.end);
		        }
		        else {
		            operator = ' '.repeat(ast.right.location.start - ast.left.location.end);
		        }
		        return `${(0, exports.serialize)(ast.left)}${operator}${(0, exports.serialize)(ast.right)}`;
		    }
		    if (ast.type === 'UnaryOperator') {
		        return ((ast.operator === 'NOT' ? 'NOT ' : ast.operator) + (0, exports.serialize)(ast.operand));
		    }
		    if (ast.type === 'EmptyExpression') {
		        return '';
		    }
		    throw new Error('Unexpected AST type.');
		};
		exports.serialize = serialize; 
	} (serialize));
	return serialize;
}

var test = {};

var hasRequiredTest;

function requireTest () {
	if (hasRequiredTest) return test;
	hasRequiredTest = 1;
	Object.defineProperty(test, "__esModule", { value: true });
	test.test = void 0;
	const filter_1 = requireFilter();
	const test$1 = (ast, subject) => {
	    return (0, filter_1.filter)(ast, [subject]).length === 1;
	};
	test.test = test$1;
	return test;
}

var hasRequiredLiqe;

function requireLiqe () {
	if (hasRequiredLiqe) return Liqe;
	hasRequiredLiqe = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.test = exports.serialize = exports.parse = exports.isSafeUnquotedExpression = exports.highlight = exports.filter = exports.SyntaxError = exports.LiqeError = void 0;
		var errors_1 = requireErrors();
		Object.defineProperty(exports, "LiqeError", { enumerable: true, get: function () { return errors_1.LiqeError; } });
		Object.defineProperty(exports, "SyntaxError", { enumerable: true, get: function () { return errors_1.SyntaxError; } });
		var filter_1 = requireFilter();
		Object.defineProperty(exports, "filter", { enumerable: true, get: function () { return filter_1.filter; } });
		var highlight_1 = requireHighlight();
		Object.defineProperty(exports, "highlight", { enumerable: true, get: function () { return highlight_1.highlight; } });
		var isSafeUnquotedExpression_1 = requireIsSafeUnquotedExpression();
		Object.defineProperty(exports, "isSafeUnquotedExpression", { enumerable: true, get: function () { return isSafeUnquotedExpression_1.isSafeUnquotedExpression; } });
		var parse_1 = requireParse();
		Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return parse_1.parse; } });
		var serialize_1 = requireSerialize();
		Object.defineProperty(exports, "serialize", { enumerable: true, get: function () { return serialize_1.serialize; } });
		var test_1 = requireTest();
		Object.defineProperty(exports, "test", { enumerable: true, get: function () { return test_1.test; } }); 
	} (Liqe));
	return Liqe;
}

var hasRequiredCreateLogWriter;

function requireCreateLogWriter () {
	if (hasRequiredCreateLogWriter) return createLogWriter;
	hasRequiredCreateLogWriter = 1;
	var __rest = (createLogWriter && createLogWriter.__rest) || function (s, e) {
	    var t = {};
	    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
	        t[p] = s[p];
	    if (s != null && typeof Object.getOwnPropertySymbols === "function")
	        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
	                t[p[i]] = s[p[i]];
	        }
	    return t;
	};
	var __importDefault = (createLogWriter && createLogWriter.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(createLogWriter, "__esModule", { value: true });
	createLogWriter.createLogWriter = void 0;
	var createLogMethods_1 = requireCreateLogMethods();
	var boolean_1 = requireLib();
	var globalthis_1 = __importDefault(requireGlobalthis());
	var liqe_1 = requireLiqe();
	var roarr_1 = requireRoarr();
	var globalThis = (0, globalthis_1.default)();
	var logLevelColors = {
	    debug: {
	        backgroundColor: '#712bde',
	        color: '#fff',
	    },
	    error: {
	        backgroundColor: '#f05033',
	        color: '#fff',
	    },
	    fatal: {
	        backgroundColor: '#f05033',
	        color: '#fff',
	    },
	    info: {
	        backgroundColor: '#3174f1',
	        color: '#fff',
	    },
	    trace: {
	        backgroundColor: '#666',
	        color: '#fff',
	    },
	    warn: {
	        backgroundColor: '#f5a623',
	        color: '#000',
	    },
	};
	var namespaceColors = {
	    debug: {
	        color: '#8367d3',
	    },
	    error: {
	        color: '#ff1a1a',
	    },
	    fatal: {
	        color: '#ff1a1a',
	    },
	    info: {
	        color: '#3291ff',
	    },
	    trace: {
	        color: '#999',
	    },
	    warn: {
	        color: '#f7b955',
	    },
	};
	var findLiqeQuery = function (storage) {
	    var query = storage.getItem('ROARR_FILTER');
	    return query ? (0, liqe_1.parse)(query) : null;
	};
	var createLogWriter$1 = function (configuration) {
	    var _a, _b, _c;
	    if (configuration === void 0) { configuration = {}; }
	    var styleOutput = (_a = configuration === null || configuration === void 0 ? void 0 : configuration.styleOutput) !== null && _a !== void 0 ? _a : true;
	    var storage = (_b = configuration === null || configuration === void 0 ? void 0 : configuration.storage) !== null && _b !== void 0 ? _b : globalThis.localStorage;
	    var logMethods = (_c = configuration === null || configuration === void 0 ? void 0 : configuration.logMethods) !== null && _c !== void 0 ? _c : (0, createLogMethods_1.createLogMethods)();
	    if (!storage && !globalThis.localStorage) {
	        // eslint-disable-next-line no-console
	        console.warn('initiated Roarr browser log writer in non-browser context');
	        return function () {
	            // Do nothing.
	        };
	    }
	    if (!(0, boolean_1.boolean)(storage.getItem('ROARR_LOG'))) {
	        return function () {
	            // Do nothing.
	        };
	    }
	    var liqeQuery = findLiqeQuery(storage);
	    if (styleOutput) {
	        return function (message) {
	            var payload = JSON.parse(message);
	            var _a = payload.context, numericLogLevel = _a.logLevel, namespace = _a.namespace, context = __rest(_a, ["logLevel", "namespace"]);
	            if (liqeQuery && !(0, liqe_1.test)(liqeQuery, payload)) {
	                return;
	            }
	            var logLevelName = (0, roarr_1.getLogLevelName)(Number(numericLogLevel));
	            var logMethod = logMethods[logLevelName];
	            var logColor = logLevelColors[logLevelName];
	            var styles = "\n        background-color: ".concat(logColor.backgroundColor, ";\n        color: ").concat(logColor.color, ";\n        font-weight: bold;\n      ");
	            var namespaceStyles = "\n        color: ".concat(namespaceColors[logLevelName].color, ";\n      ");
	            var resetStyles = "\n        color: inherit;\n      ";
	            if (Object.keys(context).length > 0) {
	                logMethod("%c ".concat(logLevelName, " %c").concat(namespace ? " [".concat(String(namespace), "]:") : '', "%c ").concat(payload.message, " %O"), styles, namespaceStyles, resetStyles, context);
	            }
	            else {
	                logMethod("%c ".concat(logLevelName, " %c").concat(namespace ? " [".concat(String(namespace), "]:") : '', "%c ").concat(payload.message), styles, namespaceStyles, resetStyles);
	            }
	        };
	    }
	    return function (message) {
	        var payload = JSON.parse(message);
	        var _a = payload.context, numericLogLevel = _a.logLevel, namespace = _a.namespace, context = __rest(_a, ["logLevel", "namespace"]);
	        if (liqeQuery && !(0, liqe_1.test)(liqeQuery, payload)) {
	            return;
	        }
	        var logLevelName = (0, roarr_1.getLogLevelName)(Number(numericLogLevel));
	        var logMethod = logMethods[logLevelName];
	        if (Object.keys(context).length > 0) {
	            logMethod("".concat(logLevelName, " ").concat(namespace ? " [".concat(String(namespace), "]:") : '', " ").concat(payload.message), context);
	        }
	        else {
	            logMethod("".concat(logLevelName, " ").concat(namespace ? " [".concat(String(namespace), "]:") : '', " ").concat(payload.message));
	        }
	    };
	};
	createLogWriter.createLogWriter = createLogWriter$1;
	return createLogWriter;
}

var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist;
	hasRequiredDist = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.createLogWriter = void 0;
		var createLogWriter_1 = requireCreateLogWriter();
		Object.defineProperty(exports, "createLogWriter", { enumerable: true, get: function () { return createLogWriter_1.createLogWriter; } }); 
	} (dist));
	return dist;
}

var distExports = requireDist();

globalThis.ROARR = globalThis.ROARR ?? {};
globalThis.ROARR.write = distExports.createLogWriter();

/**
 * @typedef {UiComponent} UiComponent
 */

/**
 * Represents a registered UI component entry within the registry.
 * @typedef {object} ComponentEntry
 * @property {string} id - Unique identifier of the component.
 * @property {string} status - Lifecycle status (e.g., 'registered', 'rendering', 'rendered', 'destroying', 'destroyed', 'error').
 * @property {UiComponent} instance - The actual component instance.
 * @property {string} type - info on the type of the component
 * @property {HTMLElement | null} node - The root DOM node of the rendered component.
 * @property {HTMLElement | null} targetNode - The DOM node where the component was rendered into.
 */

/**
 * Manages the lifecycle and provides access to UI component instances.
 */
class UiRegistry {
    /**
     * Initializes a new instance of the UiRegistry.
     */
    constructor() {
        /**
         * Stores the registered components, keyed by their ID.
         * @type {Map<string, ComponentEntry>}
         * @private
         */
        this._components = new Map();
        this._dependencies = { log: RoarrExports.Roarr };
        this._dependencies.log.info("UiRegistry initialized");
    }

    /**
     * Registers a new component instance.
     * @param {UiComponent} componentInstance - The UI component instance to register.
     * @returns {ComponentEntry | null} The created registry entry, or null if registration failed.
     * @throws {Error} Throws an error if a component with the same ID is already registered.
     */
    register(componentInstance) {
        if (!componentInstance || !componentInstance.id) {
            this._dependencies.log.warn("UiRegistry: Cannot register invalid component instance.");
            return null;
        }

        const id = componentInstance.id;

        if (this._components.has(id)) {
            this._dependencies.log.error(
                `UiRegistry: Component with ID '${id}' is already registered.`,
            );
        }

        const type = componentInstance.type;

        /** @type {ComponentEntry} */
        const entry = {
            id: id,
            instance: componentInstance,
            type: type,
            status: "registered",
            node: null,
            targetNode: null,
        };

        this._components.set(id, entry);
        this._dependencies.log.info(`UiRegistry: Component '${id}' of type '${type}' registered.`);
        return entry;
    }

    /**
     * Unregisters a component, removes it from the registry, and calls its destroy method.
     * @param {string} id - The ID of the component to unregister.
     * @returns {boolean} True if the component was found and unregistered, false otherwise.
     */
    unregister(id) {
        const entry = this.getEntryById(id);

        if (entry) {
            this.updateStatus(id, "destroying");
            console.log(`UiRegistry: Unregistering component '${id}' of type '${entry.type}'.`);

            try {
                // Check if the instance has a destroy method before calling
                if (typeof entry.instance.destroy === "function") {
                    entry.instance.destroy();
                } else {
                    console.warn(
                        `UiRegistry: Component '${id}' instance does not have a destroy() method. Manual cleanup might be required.`,
                    );
                    entry.node?.remove();
                }
                this.updateStatus(id, "destroyed"); // Optional: Mark as destroyed before deleting
            } catch (error) {
                console.error(
                    `UiRegistry: Error during destroy() call for component '${id}':`,
                    error,
                );
                // Still attempt to remove from registry even if destroy fails
            }

            const deleted = this._components.delete(id);
            if (deleted) {
                console.log(`UiRegistry: Component '${id}' removed from registry.`);
            }
            return deleted;
        } else {
            console.warn(
                `UiRegistry: Attempted to unregister component with ID '${id}', but it was not found.`,
            );
            return false;
        }
    }

    /**
     * Retrieves the full registry entry for a given component ID.
     * @param {string} id - The ID of the component entry to retrieve.
     * @returns {ComponentEntry | undefined} The component entry if found, otherwise undefined.
     */
    getEntryById(id) {
        return this._components.get(id);
    }

    /**
     * Retrieves the component instance for a given component ID.
     * @param {string} id - The ID of the component instance to retrieve.
     * @returns {UiComponent | undefined} The component instance if found, otherwise undefined.
     */
    getComponentById(id) {
        const entry = this.getEntryById(id);
        return entry?.instance;
    }

    /**
     * Updates the status of a registered component.
     * @param {string} id - The ID of the component.
     * @param {string} status - The new status string.
     * @returns {boolean} True if the status was updated, false otherwise.
     */
    updateStatus(id, status) {
        const entry = this.getEntryById(id);
        if (entry) {
            entry.status;
            entry.status = status;
            // Optional: Add more detailed logging if needed
            // console.log(`UiRegistry: Status for component '${id}' updated from '${oldStatus}' to '${status}'.`);
            return true;
        } else {
            console.warn(
                `UiRegistry: Attempted to update status for non-existent component ID '${id}'.`,
            );
            return false;
        }
    }

    /**
     * Updates the DOM node references for a registered component. Typically called after rendering.
     * @param {string} id - The ID of the component.
     * @param {HTMLElement | null} node - The main rendered HTMLElement of the component.
     * @param {HTMLElement | null} targetNode - The HTMLElement where the component was rendered into.
     * @returns {boolean} True if the nodes were updated, false otherwise.
     */
    updateNodes(id, node, targetNode) {
        const entry = this.getEntryById(id);
        if (entry) {
            entry.node = node;
            entry.targetNode = targetNode;
            // console.log(`UiRegistry: DOM node references updated for component '${id}'.`);
            return true;
        } else {
            console.warn(
                `UiRegistry: Attempted to update nodes for non-existent component ID '${id}'.`,
            );
            return false;
        }
    }

    /**
     * Checks if a component with the given ID is registered.
     * @param {string} id - The component ID to check.
     * @returns {boolean} True if the component is registered, false otherwise.
     */
    hasComponent(id) {
        return this._components.has(id);
    }

    /**
     * Gets the current number of registered components.
     * @returns {number} The number of components in the registry.
     */
    getSize() {
        return this._components.size;
    }

    /**
     * Retrieves all component entries currently in the registry.
     * @returns {ComponentEntry[]} An array of all component entries.
     */
    getAllEntries() {
        return Array.from(this._components.values());
    }

    /**
     * Retrieves all component instances currently in the registry.
     * @returns {UiComponent[]} An array of all component instances.
     */
    getAllComponents() {
        return Array.from(this._components.values(), (entry) => entry.instance);
    }
}

const uiRegistry = new UiRegistry();

let config = null;

/**
 * Loads the configuration for the UI framework.
 * @returns {Promise<Object>} The configuration object.
 * @throws {Error} If fetching the configuration fails.
 */
async function loadConfig() {
  if (!config) {
    try {
      const response = await fetch('./sv-ui-config.json');
      if (!response.ok) throw new Error("Config fetch failed");
      config = await response.json();
    } catch (error) {
      console.error('Error loading config:', error);
      throw error;
    }
  }
  return config;
}



function getConfig() {
    return config;
}

/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

var objectToString = Object.prototype.toString;
var isArray = Array.isArray || function isArrayPolyfill (object) {
  return objectToString.call(object) === '[object Array]';
};

function isFunction (object) {
  return typeof object === 'function';
}

/**
 * More correct typeof string handling array
 * which normally returns typeof 'object'
 */
function typeStr (obj) {
  return isArray(obj) ? 'array' : typeof obj;
}

function escapeRegExp (string) {
  return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
}

/**
 * Null safe way of checking whether or not an object,
 * including its prototype, has a given property
 */
function hasProperty (obj, propName) {
  return obj != null && typeof obj === 'object' && (propName in obj);
}

/**
 * Safe way of detecting whether or not the given thing is a primitive and
 * whether it has the given property
 */
function primitiveHasOwnProperty (primitive, propName) {
  return (
    primitive != null
    && typeof primitive !== 'object'
    && primitive.hasOwnProperty
    && primitive.hasOwnProperty(propName)
  );
}

// Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
// See https://github.com/janl/mustache.js/issues/189
var regExpTest = RegExp.prototype.test;
function testRegExp (re, string) {
  return regExpTest.call(re, string);
}

var nonSpaceRe = /\S/;
function isWhitespace (string) {
  return !testRegExp(nonSpaceRe, string);
}

var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
    return entityMap[s];
  });
}

var whiteRe = /\s*/;
var spaceRe = /\s+/;
var equalsRe = /\s*=/;
var curlyRe = /\s*\}/;
var tagRe = /#|\^|\/|>|\{|&|=|!/;

/**
 * Breaks up the given `template` string into a tree of tokens. If the `tags`
 * argument is given here it must be an array with two string values: the
 * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
 * course, the default is to use mustaches (i.e. mustache.tags).
 *
 * A token is an array with at least 4 elements. The first element is the
 * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
 * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
 * all text that appears outside a symbol this element is "text".
 *
 * The second element of a token is its "value". For mustache tags this is
 * whatever else was inside the tag besides the opening symbol. For text tokens
 * this is the text itself.
 *
 * The third and fourth elements of the token are the start and end indices,
 * respectively, of the token in the original template.
 *
 * Tokens that are the root node of a subtree contain two more elements: 1) an
 * array of tokens in the subtree and 2) the index in the original template at
 * which the closing tag for that section begins.
 *
 * Tokens for partials also contain two more elements: 1) a string value of
 * indendation prior to that tag and 2) the index of that tag on that line -
 * eg a value of 2 indicates the partial is the third tag on this line.
 */
function parseTemplate (template, tags) {
  if (!template)
    return [];
  var lineHasNonSpace = false;
  var sections = [];     // Stack to hold section tokens
  var tokens = [];       // Buffer to hold the tokens
  var spaces = [];       // Indices of whitespace tokens on the current line
  var hasTag = false;    // Is there a {{tag}} on the current line?
  var nonSpace = false;  // Is there a non-space char on the current line?
  var indentation = '';  // Tracks indentation for tags that use it
  var tagIndex = 0;      // Stores a count of number of tags encountered on a line

  // Strips all whitespace tokens array for the current line
  // if there was a {{#tag}} on it and otherwise only space.
  function stripSpace () {
    if (hasTag && !nonSpace) {
      while (spaces.length)
        delete tokens[spaces.pop()];
    } else {
      spaces = [];
    }

    hasTag = false;
    nonSpace = false;
  }

  var openingTagRe, closingTagRe, closingCurlyRe;
  function compileTags (tagsToCompile) {
    if (typeof tagsToCompile === 'string')
      tagsToCompile = tagsToCompile.split(spaceRe, 2);

    if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
      throw new Error('Invalid tags: ' + tagsToCompile);

    openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
    closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
    closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
  }

  compileTags(tags || mustache.tags);

  var scanner = new Scanner(template);

  var start, type, value, chr, token, openSection;
  while (!scanner.eos()) {
    start = scanner.pos;

    // Match any text between tags.
    value = scanner.scanUntil(openingTagRe);

    if (value) {
      for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
        chr = value.charAt(i);

        if (isWhitespace(chr)) {
          spaces.push(tokens.length);
          indentation += chr;
        } else {
          nonSpace = true;
          lineHasNonSpace = true;
          indentation += ' ';
        }

        tokens.push([ 'text', chr, start, start + 1 ]);
        start += 1;

        // Check for whitespace on the current line.
        if (chr === '\n') {
          stripSpace();
          indentation = '';
          tagIndex = 0;
          lineHasNonSpace = false;
        }
      }
    }

    // Match the opening tag.
    if (!scanner.scan(openingTagRe))
      break;

    hasTag = true;

    // Get the tag type.
    type = scanner.scan(tagRe) || 'name';
    scanner.scan(whiteRe);

    // Get the tag value.
    if (type === '=') {
      value = scanner.scanUntil(equalsRe);
      scanner.scan(equalsRe);
      scanner.scanUntil(closingTagRe);
    } else if (type === '{') {
      value = scanner.scanUntil(closingCurlyRe);
      scanner.scan(curlyRe);
      scanner.scanUntil(closingTagRe);
      type = '&';
    } else {
      value = scanner.scanUntil(closingTagRe);
    }

    // Match the closing tag.
    if (!scanner.scan(closingTagRe))
      throw new Error('Unclosed tag at ' + scanner.pos);

    if (type == '>') {
      token = [ type, value, start, scanner.pos, indentation, tagIndex, lineHasNonSpace ];
    } else {
      token = [ type, value, start, scanner.pos ];
    }
    tagIndex++;
    tokens.push(token);

    if (type === '#' || type === '^') {
      sections.push(token);
    } else if (type === '/') {
      // Check section nesting.
      openSection = sections.pop();

      if (!openSection)
        throw new Error('Unopened section "' + value + '" at ' + start);

      if (openSection[1] !== value)
        throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
    } else if (type === 'name' || type === '{' || type === '&') {
      nonSpace = true;
    } else if (type === '=') {
      // Set the tags for the next time around.
      compileTags(value);
    }
  }

  stripSpace();

  // Make sure there are no open sections when we're done.
  openSection = sections.pop();

  if (openSection)
    throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

  return nestTokens(squashTokens(tokens));
}

/**
 * Combines the values of consecutive text tokens in the given `tokens` array
 * to a single token.
 */
function squashTokens (tokens) {
  var squashedTokens = [];

  var token, lastToken;
  for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
    token = tokens[i];

    if (token) {
      if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
        lastToken[1] += token[1];
        lastToken[3] = token[3];
      } else {
        squashedTokens.push(token);
        lastToken = token;
      }
    }
  }

  return squashedTokens;
}

/**
 * Forms the given array of `tokens` into a nested tree structure where
 * tokens that represent a section have two additional items: 1) an array of
 * all tokens that appear in that section and 2) the index in the original
 * template that represents the end of that section.
 */
function nestTokens (tokens) {
  var nestedTokens = [];
  var collector = nestedTokens;
  var sections = [];

  var token, section;
  for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
    token = tokens[i];

    switch (token[0]) {
      case '#':
      case '^':
        collector.push(token);
        sections.push(token);
        collector = token[4] = [];
        break;
      case '/':
        section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
        break;
      default:
        collector.push(token);
    }
  }

  return nestedTokens;
}

/**
 * A simple string scanner that is used by the template parser to find
 * tokens in template strings.
 */
function Scanner (string) {
  this.string = string;
  this.tail = string;
  this.pos = 0;
}

/**
 * Returns `true` if the tail is empty (end of string).
 */
Scanner.prototype.eos = function eos () {
  return this.tail === '';
};

/**
 * Tries to match the given regular expression at the current position.
 * Returns the matched text if it can match, the empty string otherwise.
 */
Scanner.prototype.scan = function scan (re) {
  var match = this.tail.match(re);

  if (!match || match.index !== 0)
    return '';

  var string = match[0];

  this.tail = this.tail.substring(string.length);
  this.pos += string.length;

  return string;
};

/**
 * Skips all text until the given regular expression can be matched. Returns
 * the skipped string, which is the entire tail if no match can be made.
 */
Scanner.prototype.scanUntil = function scanUntil (re) {
  var index = this.tail.search(re), match;

  switch (index) {
    case -1:
      match = this.tail;
      this.tail = '';
      break;
    case 0:
      match = '';
      break;
    default:
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);
  }

  this.pos += match.length;

  return match;
};

/**
 * Represents a rendering context by wrapping a view object and
 * maintaining a reference to the parent context.
 */
function Context (view, parentContext) {
  this.view = view;
  this.cache = { '.': this.view };
  this.parent = parentContext;
}

/**
 * Creates a new context using the given view with this context
 * as the parent.
 */
Context.prototype.push = function push (view) {
  return new Context(view, this);
};

/**
 * Returns the value of the given name in this context, traversing
 * up the context hierarchy if the value is absent in this context's view.
 */
Context.prototype.lookup = function lookup (name) {
  var cache = this.cache;

  var value;
  if (cache.hasOwnProperty(name)) {
    value = cache[name];
  } else {
    var context = this, intermediateValue, names, index, lookupHit = false;

    while (context) {
      if (name.indexOf('.') > 0) {
        intermediateValue = context.view;
        names = name.split('.');
        index = 0;

        /**
         * Using the dot notion path in `name`, we descend through the
         * nested objects.
         *
         * To be certain that the lookup has been successful, we have to
         * check if the last object in the path actually has the property
         * we are looking for. We store the result in `lookupHit`.
         *
         * This is specially necessary for when the value has been set to
         * `undefined` and we want to avoid looking up parent contexts.
         *
         * In the case where dot notation is used, we consider the lookup
         * to be successful even if the last "object" in the path is
         * not actually an object but a primitive (e.g., a string, or an
         * integer), because it is sometimes useful to access a property
         * of an autoboxed primitive, such as the length of a string.
         **/
        while (intermediateValue != null && index < names.length) {
          if (index === names.length - 1)
            lookupHit = (
              hasProperty(intermediateValue, names[index])
              || primitiveHasOwnProperty(intermediateValue, names[index])
            );

          intermediateValue = intermediateValue[names[index++]];
        }
      } else {
        intermediateValue = context.view[name];

        /**
         * Only checking against `hasProperty`, which always returns `false` if
         * `context.view` is not an object. Deliberately omitting the check
         * against `primitiveHasOwnProperty` if dot notation is not used.
         *
         * Consider this example:
         * ```
         * Mustache.render("The length of a football field is {{#length}}{{length}}{{/length}}.", {length: "100 yards"})
         * ```
         *
         * If we were to check also against `primitiveHasOwnProperty`, as we do
         * in the dot notation case, then render call would return:
         *
         * "The length of a football field is 9."
         *
         * rather than the expected:
         *
         * "The length of a football field is 100 yards."
         **/
        lookupHit = hasProperty(context.view, name);
      }

      if (lookupHit) {
        value = intermediateValue;
        break;
      }

      context = context.parent;
    }

    cache[name] = value;
  }

  if (isFunction(value))
    value = value.call(this.view);

  return value;
};

/**
 * A Writer knows how to take a stream of tokens and render them to a
 * string, given a context. It also maintains a cache of templates to
 * avoid the need to parse the same template twice.
 */
function Writer () {
  this.templateCache = {
    _cache: {},
    set: function set (key, value) {
      this._cache[key] = value;
    },
    get: function get (key) {
      return this._cache[key];
    },
    clear: function clear () {
      this._cache = {};
    }
  };
}

/**
 * Clears all cached templates in this writer.
 */
Writer.prototype.clearCache = function clearCache () {
  if (typeof this.templateCache !== 'undefined') {
    this.templateCache.clear();
  }
};

/**
 * Parses and caches the given `template` according to the given `tags` or
 * `mustache.tags` if `tags` is omitted,  and returns the array of tokens
 * that is generated from the parse.
 */
Writer.prototype.parse = function parse (template, tags) {
  var cache = this.templateCache;
  var cacheKey = template + ':' + (tags || mustache.tags).join(':');
  var isCacheEnabled = typeof cache !== 'undefined';
  var tokens = isCacheEnabled ? cache.get(cacheKey) : undefined;

  if (tokens == undefined) {
    tokens = parseTemplate(template, tags);
    isCacheEnabled && cache.set(cacheKey, tokens);
  }
  return tokens;
};

/**
 * High-level method that is used to render the given `template` with
 * the given `view`.
 *
 * The optional `partials` argument may be an object that contains the
 * names and templates of partials that are used in the template. It may
 * also be a function that is used to load partial templates on the fly
 * that takes a single argument: the name of the partial.
 *
 * If the optional `config` argument is given here, then it should be an
 * object with a `tags` attribute or an `escape` attribute or both.
 * If an array is passed, then it will be interpreted the same way as
 * a `tags` attribute on a `config` object.
 *
 * The `tags` attribute of a `config` object must be an array with two
 * string values: the opening and closing tags used in the template (e.g.
 * [ "<%", "%>" ]). The default is to mustache.tags.
 *
 * The `escape` attribute of a `config` object must be a function which
 * accepts a string as input and outputs a safely escaped string.
 * If an `escape` function is not provided, then an HTML-safe string
 * escaping function is used as the default.
 */
Writer.prototype.render = function render (template, view, partials, config) {
  var tags = this.getConfigTags(config);
  var tokens = this.parse(template, tags);
  var context = (view instanceof Context) ? view : new Context(view, undefined);
  return this.renderTokens(tokens, context, partials, template, config);
};

/**
 * Low-level method that renders the given array of `tokens` using
 * the given `context` and `partials`.
 *
 * Note: The `originalTemplate` is only ever used to extract the portion
 * of the original template that was contained in a higher-order section.
 * If the template doesn't use higher-order sections, this argument may
 * be omitted.
 */
Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate, config) {
  var buffer = '';

  var token, symbol, value;
  for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
    value = undefined;
    token = tokens[i];
    symbol = token[0];

    if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate, config);
    else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate, config);
    else if (symbol === '>') value = this.renderPartial(token, context, partials, config);
    else if (symbol === '&') value = this.unescapedValue(token, context);
    else if (symbol === 'name') value = this.escapedValue(token, context, config);
    else if (symbol === 'text') value = this.rawValue(token);

    if (value !== undefined)
      buffer += value;
  }

  return buffer;
};

Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate, config) {
  var self = this;
  var buffer = '';
  var value = context.lookup(token[1]);

  // This function is used to render an arbitrary template
  // in the current context by higher-order sections.
  function subRender (template) {
    return self.render(template, context, partials, config);
  }

  if (!value) return;

  if (isArray(value)) {
    for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
      buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate, config);
    }
  } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
    buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate, config);
  } else if (isFunction(value)) {
    if (typeof originalTemplate !== 'string')
      throw new Error('Cannot use higher-order sections without the original template');

    // Extract the portion of the original template that the section contains.
    value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

    if (value != null)
      buffer += value;
  } else {
    buffer += this.renderTokens(token[4], context, partials, originalTemplate, config);
  }
  return buffer;
};

Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate, config) {
  var value = context.lookup(token[1]);

  // Use JavaScript's definition of falsy. Include empty arrays.
  // See https://github.com/janl/mustache.js/issues/186
  if (!value || (isArray(value) && value.length === 0))
    return this.renderTokens(token[4], context, partials, originalTemplate, config);
};

Writer.prototype.indentPartial = function indentPartial (partial, indentation, lineHasNonSpace) {
  var filteredIndentation = indentation.replace(/[^ \t]/g, '');
  var partialByNl = partial.split('\n');
  for (var i = 0; i < partialByNl.length; i++) {
    if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) {
      partialByNl[i] = filteredIndentation + partialByNl[i];
    }
  }
  return partialByNl.join('\n');
};

Writer.prototype.renderPartial = function renderPartial (token, context, partials, config) {
  if (!partials) return;
  var tags = this.getConfigTags(config);

  var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
  if (value != null) {
    var lineHasNonSpace = token[6];
    var tagIndex = token[5];
    var indentation = token[4];
    var indentedValue = value;
    if (tagIndex == 0 && indentation) {
      indentedValue = this.indentPartial(value, indentation, lineHasNonSpace);
    }
    var tokens = this.parse(indentedValue, tags);
    return this.renderTokens(tokens, context, partials, indentedValue, config);
  }
};

Writer.prototype.unescapedValue = function unescapedValue (token, context) {
  var value = context.lookup(token[1]);
  if (value != null)
    return value;
};

Writer.prototype.escapedValue = function escapedValue (token, context, config) {
  var escape = this.getConfigEscape(config) || mustache.escape;
  var value = context.lookup(token[1]);
  if (value != null)
    return (typeof value === 'number' && escape === mustache.escape) ? String(value) : escape(value);
};

Writer.prototype.rawValue = function rawValue (token) {
  return token[1];
};

Writer.prototype.getConfigTags = function getConfigTags (config) {
  if (isArray(config)) {
    return config;
  }
  else if (config && typeof config === 'object') {
    return config.tags;
  }
  else {
    return undefined;
  }
};

Writer.prototype.getConfigEscape = function getConfigEscape (config) {
  if (config && typeof config === 'object' && !isArray(config)) {
    return config.escape;
  }
  else {
    return undefined;
  }
};

var mustache = {
  name: 'mustache.js',
  version: '4.2.0',
  tags: [ '{{', '}}' ],
  clearCache: undefined,
  escape: undefined,
  parse: undefined,
  render: undefined,
  Scanner: undefined,
  Context: undefined,
  Writer: undefined,
  /**
   * Allows a user to override the default caching strategy, by providing an
   * object with set, get and clear methods. This can also be used to disable
   * the cache by setting it to the literal `undefined`.
   */
  set templateCache (cache) {
    defaultWriter.templateCache = cache;
  },
  /**
   * Gets the default or overridden caching object from the default writer.
   */
  get templateCache () {
    return defaultWriter.templateCache;
  }
};

// All high-level mustache.* functions use this writer.
var defaultWriter = new Writer();

/**
 * Clears all cached templates in the default writer.
 */
mustache.clearCache = function clearCache () {
  return defaultWriter.clearCache();
};

/**
 * Parses and caches the given template in the default writer and returns the
 * array of tokens it contains. Doing this ahead of time avoids the need to
 * parse templates on the fly as they are rendered.
 */
mustache.parse = function parse (template, tags) {
  return defaultWriter.parse(template, tags);
};

/**
 * Renders the `template` with the given `view`, `partials`, and `config`
 * using the default writer.
 */
mustache.render = function render (template, view, partials, config) {
  if (typeof template !== 'string') {
    throw new TypeError('Invalid template! Template should be a "string" ' +
                        'but "' + typeStr(template) + '" was given as the first ' +
                        'argument for mustache#render(template, view, partials)');
  }

  return defaultWriter.render(template, view, partials, config);
};

// Export the escaping function so that the user may override it.
// See https://github.com/janl/mustache.js/issues/244
mustache.escape = escapeHtml;

// Export these mainly for testing, but also for advanced usage.
mustache.Scanner = Scanner;
mustache.Context = Context;
mustache.Writer = Writer;

/**
 * Convert a html string to DOM
 * @param {string} htmlString 
 * @returns {Node}
 */
function htmlStringToElement(htmlString) {
    const template = document.createElement('template');
    template.innerHTML = htmlString.trim();
    const element = template.content.firstChild;
    return element;
}

/**
 * Loads an HTML template from a given file path.
 * @param {string} templatePath - The path to the template file.
 * @returns {Promise<string>} The template content as a string.
 * @throws {Error} If the template cannot be loaded.
 */
async function loadTemplate(templatePath) {
    const response = await fetch(templatePath);
    if (!response.ok) {
        throw new Error(`Failed to load template: ${templatePath}`);
    }
    return await response.text();
}

function renderTpl(template, renderProps = {}) {
    const htmlStr = mustache.render(template, renderProps);
    return htmlStringToElement(htmlStr);
}

const createId = (length = 8) => {
  return [...crypto.getRandomValues(new Uint8Array(length))]
    .map(byte => byte.toString(36).padStart(2, '0'))
    .join('')
    .slice(0, length);
};

/**
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Indicates whether the validation passed.
 * @property {string} alertType - The type of alert to display (e.g., 'error', 'warning', 'success').
 * @property {string} message - The validation message to display.
 */

class ValidationService {
    /**
     * Validates the input value using the provided validation function.
     * @param {string} value - The value to validate.
     * @param {function(string): ValidationResult} validationFunction - The validation function.
     * @returns {ValidationResult} The result of the validation.
     */
    static async validate(value, validationFunction) {
        if (typeof validationFunction !== "function") {
            throw new Error("Validation function must be a function.");
        }

        const result = await validationFunction(value);

        if (
            typeof result !== "object" ||
            typeof result.isValid !== "boolean" ||
            typeof result.alertType !== "string" ||
            typeof result.message !== "string"
        ) {
            throw new Error(
                "Validation function must return a ValidationResult object.",
            );
        }

        return result;
    }
}

class Dependencies {
    constructor() {
        this.loadTemplate = loadTemplate;
        this.renderTpl = renderTpl;
        this.loadConfig = loadConfig;
        this.getConfig = getConfig;
        this.log = RoarrExports.Roarr;
        this.createId = createId;
        this.uiRegistry = uiRegistry;
        this.validationService = ValidationService;
    }
}

const dependencyInjection = new Dependencies();

/**
 * Base class for UI components.
 */
class UiComponent {
    /**
     * Creates an instance of UiComponent.
     * @param {Object} options - Configuration options for the UI component.
     * @param {null|string} options.id - The unique identifier for the component.
     * @param {string} options.label - The label for the component.
     * @param {boolean} options.showLoading
     * @param {null|() => Promise<Object>} [options.fetchFunction] - An optional async function to fetch data.
     * @param {Object} dependencies - only pass different dependencies for unit tests in mocha
     */
    constructor({
        label,
        id = null,
        showLoading = true,
        fetchFunction = null,
        dependencies = dependencyInjection,
    }) {
        /** @type {Object} */
        this._dependencies = dependencies;

        /** @type {string} */
        this.id = id;

        /** @type {string} */
        this.label = label;

        /** @type {boolean} */
        this.showLoading = showLoading;

        /** @type {string} */
        this.type = "sv-ui__component";

        /** @type {boolean} */
        this.loading = null;

        /** @type {(() => Promise<Object>) | null} */
        this.fetchFunction = fetchFunction;

        /** @type {HTMLElement | null} */
        this.componentNode = null;

        /** @type {HTMLElement | null} */
        this.targetNode = null;

        /** @type {string} */
        this.templatePath = `${this._dependencies.getConfig.templateRoot}mytemplate.html`;

        /**
         * @type {Object[] | null} permanentChildren - html ids where to place rendered child ui component(s)
         * @type {string} permanentChildren[].target class of a div in the parent's html template
         * @type {UiComponent} permanentChildren[].component to place inside the div
         */
        this.permanentChildren = [];

        /**
         * @type {Object[] | null} dynamicChildren - html ids where to place rendered child ui component(s)
         * @type {string} dynamicChildren[].target class of a div in the parent's html template
         * @type {UiComponent} dynamicChildren[].component to place inside the div
         */
        this.dynamicChildren = [];
    }

    /**
     * Returns an object containing the component's properties for rendering.
     * @returns {Object} The properties used in the Mustache template.
     */
    getRenderProperties() {
        return {
            id: this.id,
            label: this.label,
            type: this.type,
        };
    }

    /**
     * @param {string} id
     */

    set id(value) {
        this._id = value || this._dependencies.createId();
    }

    get id() {
        return this._id;
    }

    /**
     * @param {boolean} state
     */
    async setLoading(state, showLoading = this.showLoading) {
        if (state && showLoading) {
            const loadingTemplate = await this._dependencies.loadTemplate(
                `${this._dependencies.getConfig().templateRoot}loading.html`,
            );
            const loadingNode = await this._dependencies.renderTpl(loadingTemplate, {
                id: this.id,
            });
            this.componentNode = await loadingNode;

            this.removeFromDom();

            if (this.targetNode) {
                this.targetNode.appendChild(this.componentNode);
            }
        }

        this.loading = state;
        this._dependencies.log.trace(
            `${this.type} with ID ${this.id}: loading state is ${this.loading}`,
        );
    }

    removeFromDom() {
        const staleComponent = document.getElementById(this.id);
        if (staleComponent) {
            staleComponent.remove();
        }
    }

    /**
     * Renders UI components and replaces content of given htmlNode
     */
    async render(
        targetNode = this.targetNode,
        { showLoading = this.showLoading, replace = true } = {},
    ) {
        if (targetNode !== this.targetNode) {
            this.targetNode = targetNode;
        }

        await this.setLoading(true, showLoading);
        this._dependencies.log.trace(
            `${this.type} with ID ${this.id}: append loading html done.`,
        );

        try {
            let propCollectionToRender;
            if (this.fetchFunction) {
                this._dependencies.log.trace(
                    `${this.type} with ID ${this.id}: starting fetch.`,
                );
                propCollectionToRender = await this.fetchData(this.fetchFunction);
            } else {
                propCollectionToRender = this.getRenderProperties();
            }

            const tempNode = document.createElement("template");

            // Render the actual component
            const componentTemplate = await this._dependencies.loadTemplate(
                this.templatePath,
            );
            const outerComponent = await this._dependencies.renderTpl(
                componentTemplate,
                propCollectionToRender,
            );
            tempNode.append(outerComponent);
            this._dependencies.log.trace(
                { tempNode },
                `${this.type} with ID ${this.id}: rendered tempNode.`,
            );

            if (this.permanentChildren) {
                await this.applyChildren(tempNode, this.permanentChildren);
            }

            if (this.dynamicChildren) {
                await this.applyChildren(tempNode, this.dynamicChildren);
            }

            this._dependencies.log.trace(
                { tempNode },
                `${this.type} with ID ${this.id}: Assembled rendering in temp Node`,
            );

            this.componentNode = tempNode.firstChild;

            const existingNode = document.getElementById(this.id);
            if (replace && existingNode) {
                existingNode.replaceWith(this.componentNode);
                this._dependencies.log.info(
                    `${this.type} with ID ${this.id}: replaced componentNode with tempNode in DOM.`,
                );
            } else if (this.targetNode) {
                // fallback: append if not found
                this.targetNode.appendChild(this.componentNode);
                this._dependencies.log.info(
                    `${this.type} with ID ${this.id}: appended componentNode in DOM targetNode.`,
                );
            }
        } catch (error) {
            this._dependencies.log.error(
                { errorMessage: error.message, errorStack: error.stack, error },
                "Render error:",
            );
        } finally {
            await this.setLoading(false);
            this._dependencies.uiRegistry.updateStatus(this.id, "rendered");
            this._dependencies.log.trace(
                `${this.type} with ID ${this.id}: loading state has been set to false (rendering final step).`,
            );
        }
    }

    async applyChildren(parentNode, childrenCollection, clearTarget = false) {
        for (const child of childrenCollection) {
            const childTargetNode = parentNode.querySelector(`.${child.target}`);
            child.component._dependencies = this._dependencies;
            if (clearTarget) {
                childTargetNode.innerHTML = "";
            }
            await child.component.render(childTargetNode);

            const childHtmlNode = child.component.componentNode;
            const existingChild = childTargetNode.querySelector(
                `[id="${child.component.id}"]`,
            );
            if (existingChild) {
                existingChild.replaceWith(childHtmlNode);
            } else {
                childTargetNode.appendChild(childHtmlNode);
            }
        }
    }

    /**
     * Fetches data using the provided fetch function and updates the component properties.
     * After fetching, it re-renders the component to reflect the new data.
     * @param {() => Promise<Object>} fetchFunction - The function to fetch data.
     * @returns {Promise<void>}
     */
    async fetchData(fetchFunction) {
        if (!fetchFunction) return;

        try {
            const newData = await fetchFunction();
            if (typeof newData === "object" && newData !== null) {
                Object.assign(this, newData);
            } else {
                console.warn("fetchFunction must return an object.");
            }
            return newData;
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
}

/**
 * @typedef {"success" | "error" | "info" | "warning"} AlertType
 */

class UiAlertMsg extends UiComponent {
    constructor({
        id,
        label,
        message,
        alertType,
        dataName = label,
        fetchFunction = null,
        dependencies = dependencyInjection,
    }) {
        super({id, label, dataName, fetchFunction, dependencies: dependencyInjection});
        this.type = "sv-ui__alert-msg";
        this.message = message;
        const validAlertTypes = [
            "success",
            "info",
            "warning",
            "error",
        ];
        if (validAlertTypes.includes(alertType)) {
            this.alertType = alertType;
        } else {
            throw new TypeError("alertType must be 'success', 'info', 'warning' or 'error'.")
        }
        this.templatePath = `${this._dependencies.getConfig().templateRoot}/alertMsg/alertMsg.html`;

        this._dependencies.uiRegistry.register(this);
    }

    createContainer() {
        const container = super.createContainer();
        container.classList.add(this.alertType);
        return container;
    }

    getRenderProperties() {
        return {
            ...super.getRenderProperties(),
            alertType: this.alertType,
            message: this.message,
        }
    }
}

class UiInput extends UiComponent {
    /**
     * @param {string} id
     * @param {string} label
     * @param {string} value
     * @param {string} dataName
     * @param {function():void | null} fetchFunction
     * @param {Dependencies} dependencies
     * @param {function():void | null} callOnAction
     * @param {function(string): ValidationResult | null} validationFunction
     * @param {ValidationResult | null} validationResult
     */
    constructor({
                    id = null,
                    label,
                    dataName = label,
                    value = null,
                    fetchFunction = null,
                    dependencies = dependencyInjection,
                    callOnAction = null,
                    validationFunction = null,
                    validationResult = null,
                }) {
        super({ id, label, fetchFunction, dependencies });
        /** @type {string} */
        this.type = "sv-ui__input";

        /** @type {string} */
        this.value = value;

        /** @type {string} */
        this.dataName = dataName;

        /** @type {() => void | null} */
        this.callOnAction = callOnAction;

        /** @type {function(string): ValidationResult | null} */
        this.validationFunction = validationFunction;

        /** @type {ValidationResult | null} */
        this.validationResult = validationResult;
    }

    getRenderProperties() {
        return {
            ...super.getRenderProperties(),
            value: this.value,
            dataName: this.dataName,
        };
    }

    getData() {
        return {
            id: this.id,
            type: this.type,
            key: this.dataName,
            value: this.value,
        };
    }

    async render(targetNode) {
        await super.render(targetNode);
        await this.setEventListeners();
        if (this.validationFunction) {
            await this.validateInput();
        } else {
            // still print alert if one was given through constructor
            if (this.validationResult) {
                await this.validationResultToAlertChild();
            }
        }
    }

    async setEventListeners() {
        const inputElement = document
            .getElementById(this.id)
            .querySelector("input");

        const onBlur = async () => {
            this.value = inputElement.value;
            if (this.callOnAction) {
                this.callOnAction();
            }
            console.log(`Input UI Component now has value: ${this.value}`);
            if (this.validationFunction) {
                await this.validateInput();
            }
        };
        inputElement.addEventListener("blur", onBlur);
    }

    async validationResultToAlertChild() {
        this.dynamicChildren = this.dynamicChildren.filter(
            (child) => child.target !== "validationAlert",
        );
        const alert = new UiAlertMsg({
            alertType: this.validationResult.alertType,
            message: this.validationResult.message,
            dependencies: dependencyInjection,
        });
        this.dynamicChildren.push({ target: "validationAlert", component: alert });
        await this.applyChildren(this.componentNode, this.dynamicChildren, true);
    }

    async validateInput() {
        if (this.validationFunction) {
            this._dependencies.log.debug(`Validating ${this.type} ${this.id}`);
            const previousResult = structuredClone(this.validationResult);
            this.validationResult = await this._dependencies.validationService.validate(this.value, this.validationFunction);
            this._dependencies.log.debug(
                `Validation result of ${this.type} ${this.id}\nPrevious: ${JSON.stringify(previousResult)}\nNow: ${JSON.stringify(this.validationResult)}`
            );
            if (previousResult == null
                || JSON.stringify(previousResult) !== JSON.stringify(this.validationResult)
            ) {
                await this.validationResultToAlertChild();
            }
        } else {
            return;
        }
    }
}

class UiTextField extends UiInput {
    /**
     * Single Line Text Field
     * @param {string} id 
     * @param {string} label 
     * @param {string} value 
     * @param {string} templatePath - The path to the template file.
     */
    constructor({id = null,
                label,
                dataName = label,
                value,
                fetchFunction = null,
                callOnAction = () => { return undefined; },
                validationFunction = null,
                validationResult = null,
                dependencies = dependencyInjection,
    }) {
        super({id, label, dataName, value, fetchFunction, callOnAction, validationFunction, validationResult, dependencies});
        this.type = "sv-ui__input-textfield";
        this.templatePath = `${this._dependencies.getConfig().templateRoot}input/textfield.html`;
        this.textfieldId = this._dependencies.createId(); // used in label for a11y
        this._dependencies.uiRegistry.register(this);
    }

    getRenderProperties() {
       return {
            ...super.getRenderProperties(),
            textfieldId: this.textfieldId,
        } 
    }
}

/**
 * @typedef {"loud" | "melodic" | "quiet" | "textlink" } ButtonPriority
 */

class UiButton extends UiInput {
    /** 
     * Buttons can either have a linkHref or a callOnAction(), not both
     * @param {ButtonPriority} buttonPriority
     */
    constructor({
        id = null,
        label,
        dataName = null,
        value = null,
        fetchFunction = null,
        dependencies = dependencyInjection,
        callOnAction = null,
        buttonPriority = "quiet",
        linkHref = null,
    }) {
        super({
            id,
            label,
            dataName,
            value,
            fetchFunction,
            dependencies,
            callOnAction,
        });
        this.type = "sv-ui__input-button";
        this.templatePath = `${this._dependencies.getConfig().templateRoot}input/button.html`;
        this.buttonPriority = buttonPriority;
        this.linkHref = linkHref;

        if (this.linkHref && this.callOnAction) {
            this._dependencies.log.error(
                "UiButton can either be a link and have a linkHref or be a button with a callOnAction(), but not both."
            );
        }

        if (this.linkHref) {
            this._isLink = true;
        } else {
            this._isLink = false;
        }

        this._dependencies.uiRegistry.register(this);
    }
    
    getRenderProperties() {
        return {
            ...super.getRenderProperties(),
            buttonPriority: this.buttonPriority, 
            isLink: this._isLink,
        }
    }

    async setEventListeners() {
        
    }
}

/*!
  Highlight.js v11.11.1 (git: 08cb242e7d)
  (c) 2006-2024 Josh Goebel <hello@joshgoebel.com> and other contributors
  License: BSD-3-Clause
 */
/* eslint-disable no-multi-assign */

function deepFreeze(obj) {
  if (obj instanceof Map) {
    obj.clear =
      obj.delete =
      obj.set =
        function () {
          throw new Error('map is read-only');
        };
  } else if (obj instanceof Set) {
    obj.add =
      obj.clear =
      obj.delete =
        function () {
          throw new Error('set is read-only');
        };
  }

  // Freeze self
  Object.freeze(obj);

  Object.getOwnPropertyNames(obj).forEach((name) => {
    const prop = obj[name];
    const type = typeof prop;

    // Freeze prop if it is an object or function and also not already frozen
    if ((type === 'object' || type === 'function') && !Object.isFrozen(prop)) {
      deepFreeze(prop);
    }
  });

  return obj;
}

/** @typedef {import('highlight.js').CallbackResponse} CallbackResponse */
/** @typedef {import('highlight.js').CompiledMode} CompiledMode */
/** @implements CallbackResponse */

class Response {
  /**
   * @param {CompiledMode} mode
   */
  constructor(mode) {
    // eslint-disable-next-line no-undefined
    if (mode.data === undefined) mode.data = {};

    this.data = mode.data;
    this.isMatchIgnored = false;
  }

  ignoreMatch() {
    this.isMatchIgnored = true;
  }
}

/**
 * @param {string} value
 * @returns {string}
 */
function escapeHTML(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * performs a shallow merge of multiple objects into one
 *
 * @template T
 * @param {T} original
 * @param {Record<string,any>[]} objects
 * @returns {T} a single new object
 */
function inherit$1(original, ...objects) {
  /** @type Record<string,any> */
  const result = Object.create(null);

  for (const key in original) {
    result[key] = original[key];
  }
  objects.forEach(function(obj) {
    for (const key in obj) {
      result[key] = obj[key];
    }
  });
  return /** @type {T} */ (result);
}

/**
 * @typedef {object} Renderer
 * @property {(text: string) => void} addText
 * @property {(node: Node) => void} openNode
 * @property {(node: Node) => void} closeNode
 * @property {() => string} value
 */

/** @typedef {{scope?: string, language?: string, sublanguage?: boolean}} Node */
/** @typedef {{walk: (r: Renderer) => void}} Tree */
/** */

const SPAN_CLOSE = '</span>';

/**
 * Determines if a node needs to be wrapped in <span>
 *
 * @param {Node} node */
const emitsWrappingTags = (node) => {
  // rarely we can have a sublanguage where language is undefined
  // TODO: track down why
  return !!node.scope;
};

/**
 *
 * @param {string} name
 * @param {{prefix:string}} options
 */
const scopeToCSSClass = (name, { prefix }) => {
  // sub-language
  if (name.startsWith("language:")) {
    return name.replace("language:", "language-");
  }
  // tiered scope: comment.line
  if (name.includes(".")) {
    const pieces = name.split(".");
    return [
      `${prefix}${pieces.shift()}`,
      ...(pieces.map((x, i) => `${x}${"_".repeat(i + 1)}`))
    ].join(" ");
  }
  // simple scope
  return `${prefix}${name}`;
};

/** @type {Renderer} */
class HTMLRenderer {
  /**
   * Creates a new HTMLRenderer
   *
   * @param {Tree} parseTree - the parse tree (must support `walk` API)
   * @param {{classPrefix: string}} options
   */
  constructor(parseTree, options) {
    this.buffer = "";
    this.classPrefix = options.classPrefix;
    parseTree.walk(this);
  }

  /**
   * Adds texts to the output stream
   *
   * @param {string} text */
  addText(text) {
    this.buffer += escapeHTML(text);
  }

  /**
   * Adds a node open to the output stream (if needed)
   *
   * @param {Node} node */
  openNode(node) {
    if (!emitsWrappingTags(node)) return;

    const className = scopeToCSSClass(node.scope,
      { prefix: this.classPrefix });
    this.span(className);
  }

  /**
   * Adds a node close to the output stream (if needed)
   *
   * @param {Node} node */
  closeNode(node) {
    if (!emitsWrappingTags(node)) return;

    this.buffer += SPAN_CLOSE;
  }

  /**
   * returns the accumulated buffer
  */
  value() {
    return this.buffer;
  }

  // helpers

  /**
   * Builds a span element
   *
   * @param {string} className */
  span(className) {
    this.buffer += `<span class="${className}">`;
  }
}

/** @typedef {{scope?: string, language?: string, children: Node[]} | string} Node */
/** @typedef {{scope?: string, language?: string, children: Node[]} } DataNode */
/** @typedef {import('highlight.js').Emitter} Emitter */
/**  */

/** @returns {DataNode} */
const newNode = (opts = {}) => {
  /** @type DataNode */
  const result = { children: [] };
  Object.assign(result, opts);
  return result;
};

class TokenTree {
  constructor() {
    /** @type DataNode */
    this.rootNode = newNode();
    this.stack = [this.rootNode];
  }

  get top() {
    return this.stack[this.stack.length - 1];
  }

  get root() { return this.rootNode; }

  /** @param {Node} node */
  add(node) {
    this.top.children.push(node);
  }

  /** @param {string} scope */
  openNode(scope) {
    /** @type Node */
    const node = newNode({ scope });
    this.add(node);
    this.stack.push(node);
  }

  closeNode() {
    if (this.stack.length > 1) {
      return this.stack.pop();
    }
    // eslint-disable-next-line no-undefined
    return undefined;
  }

  closeAllNodes() {
    while (this.closeNode());
  }

  toJSON() {
    return JSON.stringify(this.rootNode, null, 4);
  }

  /**
   * @typedef { import("./html_renderer").Renderer } Renderer
   * @param {Renderer} builder
   */
  walk(builder) {
    // this does not
    return this.constructor._walk(builder, this.rootNode);
    // this works
    // return TokenTree._walk(builder, this.rootNode);
  }

  /**
   * @param {Renderer} builder
   * @param {Node} node
   */
  static _walk(builder, node) {
    if (typeof node === "string") {
      builder.addText(node);
    } else if (node.children) {
      builder.openNode(node);
      node.children.forEach((child) => this._walk(builder, child));
      builder.closeNode(node);
    }
    return builder;
  }

  /**
   * @param {Node} node
   */
  static _collapse(node) {
    if (typeof node === "string") return;
    if (!node.children) return;

    if (node.children.every(el => typeof el === "string")) {
      // node.text = node.children.join("");
      // delete node.children;
      node.children = [node.children.join("")];
    } else {
      node.children.forEach((child) => {
        TokenTree._collapse(child);
      });
    }
  }
}

/**
  Currently this is all private API, but this is the minimal API necessary
  that an Emitter must implement to fully support the parser.

  Minimal interface:

  - addText(text)
  - __addSublanguage(emitter, subLanguageName)
  - startScope(scope)
  - endScope()
  - finalize()
  - toHTML()

*/

/**
 * @implements {Emitter}
 */
class TokenTreeEmitter extends TokenTree {
  /**
   * @param {*} options
   */
  constructor(options) {
    super();
    this.options = options;
  }

  /**
   * @param {string} text
   */
  addText(text) {
    if (text === "") { return; }

    this.add(text);
  }

  /** @param {string} scope */
  startScope(scope) {
    this.openNode(scope);
  }

  endScope() {
    this.closeNode();
  }

  /**
   * @param {Emitter & {root: DataNode}} emitter
   * @param {string} name
   */
  __addSublanguage(emitter, name) {
    /** @type DataNode */
    const node = emitter.root;
    if (name) node.scope = `language:${name}`;

    this.add(node);
  }

  toHTML() {
    const renderer = new HTMLRenderer(this, this.options);
    return renderer.value();
  }

  finalize() {
    this.closeAllNodes();
    return true;
  }
}

/**
 * @param {string} value
 * @returns {RegExp}
 * */

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function source(re) {
  if (!re) return null;
  if (typeof re === "string") return re;

  return re.source;
}

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function lookahead(re) {
  return concat('(?=', re, ')');
}

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function anyNumberOfTimes(re) {
  return concat('(?:', re, ')*');
}

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function optional(re) {
  return concat('(?:', re, ')?');
}

/**
 * @param {...(RegExp | string) } args
 * @returns {string}
 */
function concat(...args) {
  const joined = args.map((x) => source(x)).join("");
  return joined;
}

/**
 * @param { Array<string | RegExp | Object> } args
 * @returns {object}
 */
function stripOptionsFromArgs(args) {
  const opts = args[args.length - 1];

  if (typeof opts === 'object' && opts.constructor === Object) {
    args.splice(args.length - 1, 1);
    return opts;
  } else {
    return {};
  }
}

/** @typedef { {capture?: boolean} } RegexEitherOptions */

/**
 * Any of the passed expresssions may match
 *
 * Creates a huge this | this | that | that match
 * @param {(RegExp | string)[] | [...(RegExp | string)[], RegexEitherOptions]} args
 * @returns {string}
 */
function either(...args) {
  /** @type { object & {capture?: boolean} }  */
  const opts = stripOptionsFromArgs(args);
  const joined = '('
    + (opts.capture ? "" : "?:")
    + args.map((x) => source(x)).join("|") + ")";
  return joined;
}

/**
 * @param {RegExp | string} re
 * @returns {number}
 */
function countMatchGroups(re) {
  return (new RegExp(re.toString() + '|')).exec('').length - 1;
}

/**
 * Does lexeme start with a regular expression match at the beginning
 * @param {RegExp} re
 * @param {string} lexeme
 */
function startsWith(re, lexeme) {
  const match = re && re.exec(lexeme);
  return match && match.index === 0;
}

// BACKREF_RE matches an open parenthesis or backreference. To avoid
// an incorrect parse, it additionally matches the following:
// - [...] elements, where the meaning of parentheses and escapes change
// - other escape sequences, so we do not misparse escape sequences as
//   interesting elements
// - non-matching or lookahead parentheses, which do not capture. These
//   follow the '(' with a '?'.
const BACKREF_RE = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;

// **INTERNAL** Not intended for outside usage
// join logically computes regexps.join(separator), but fixes the
// backreferences so they continue to match.
// it also places each individual regular expression into it's own
// match group, keeping track of the sequencing of those match groups
// is currently an exercise for the caller. :-)
/**
 * @param {(string | RegExp)[]} regexps
 * @param {{joinWith: string}} opts
 * @returns {string}
 */
function _rewriteBackreferences(regexps, { joinWith }) {
  let numCaptures = 0;

  return regexps.map((regex) => {
    numCaptures += 1;
    const offset = numCaptures;
    let re = source(regex);
    let out = '';

    while (re.length > 0) {
      const match = BACKREF_RE.exec(re);
      if (!match) {
        out += re;
        break;
      }
      out += re.substring(0, match.index);
      re = re.substring(match.index + match[0].length);
      if (match[0][0] === '\\' && match[1]) {
        // Adjust the backreference.
        out += '\\' + String(Number(match[1]) + offset);
      } else {
        out += match[0];
        if (match[0] === '(') {
          numCaptures++;
        }
      }
    }
    return out;
  }).map(re => `(${re})`).join(joinWith);
}

/** @typedef {import('highlight.js').Mode} Mode */
/** @typedef {import('highlight.js').ModeCallback} ModeCallback */

// Common regexps
const MATCH_NOTHING_RE = /\b\B/;
const IDENT_RE = '[a-zA-Z]\\w*';
const UNDERSCORE_IDENT_RE = '[a-zA-Z_]\\w*';
const NUMBER_RE = '\\b\\d+(\\.\\d+)?';
const C_NUMBER_RE = '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)'; // 0x..., 0..., decimal, float
const BINARY_NUMBER_RE = '\\b(0b[01]+)'; // 0b...
const RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';

/**
* @param { Partial<Mode> & {binary?: string | RegExp} } opts
*/
const SHEBANG = (opts = {}) => {
  const beginShebang = /^#![ ]*\//;
  if (opts.binary) {
    opts.begin = concat(
      beginShebang,
      /.*\b/,
      opts.binary,
      /\b.*/);
  }
  return inherit$1({
    scope: 'meta',
    begin: beginShebang,
    end: /$/,
    relevance: 0,
    /** @type {ModeCallback} */
    "on:begin": (m, resp) => {
      if (m.index !== 0) resp.ignoreMatch();
    }
  }, opts);
};

// Common modes
const BACKSLASH_ESCAPE = {
  begin: '\\\\[\\s\\S]', relevance: 0
};
const APOS_STRING_MODE = {
  scope: 'string',
  begin: '\'',
  end: '\'',
  illegal: '\\n',
  contains: [BACKSLASH_ESCAPE]
};
const QUOTE_STRING_MODE = {
  scope: 'string',
  begin: '"',
  end: '"',
  illegal: '\\n',
  contains: [BACKSLASH_ESCAPE]
};
const PHRASAL_WORDS_MODE = {
  begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
};
/**
 * Creates a comment mode
 *
 * @param {string | RegExp} begin
 * @param {string | RegExp} end
 * @param {Mode | {}} [modeOptions]
 * @returns {Partial<Mode>}
 */
const COMMENT = function(begin, end, modeOptions = {}) {
  const mode = inherit$1(
    {
      scope: 'comment',
      begin,
      end,
      contains: []
    },
    modeOptions
  );
  mode.contains.push({
    scope: 'doctag',
    // hack to avoid the space from being included. the space is necessary to
    // match here to prevent the plain text rule below from gobbling up doctags
    begin: '[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)',
    end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
    excludeBegin: true,
    relevance: 0
  });
  const ENGLISH_WORD = either(
    // list of common 1 and 2 letter words in English
    "I",
    "a",
    "is",
    "so",
    "us",
    "to",
    "at",
    "if",
    "in",
    "it",
    "on",
    // note: this is not an exhaustive list of contractions, just popular ones
    /[A-Za-z]+['](d|ve|re|ll|t|s|n)/, // contractions - can't we'd they're let's, etc
    /[A-Za-z]+[-][a-z]+/, // `no-way`, etc.
    /[A-Za-z][a-z]{2,}/ // allow capitalized words at beginning of sentences
  );
  // looking like plain text, more likely to be a comment
  mode.contains.push(
    {
      // TODO: how to include ", (, ) without breaking grammars that use these for
      // comment delimiters?
      // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
      // ---

      // this tries to find sequences of 3 english words in a row (without any
      // "programming" type syntax) this gives us a strong signal that we've
      // TRULY found a comment - vs perhaps scanning with the wrong language.
      // It's possible to find something that LOOKS like the start of the
      // comment - but then if there is no readable text - good chance it is a
      // false match and not a comment.
      //
      // for a visual example please see:
      // https://github.com/highlightjs/highlight.js/issues/2827

      begin: concat(
        /[ ]+/, // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
        '(',
        ENGLISH_WORD,
        /[.]?[:]?([.][ ]|[ ])/,
        '){3}') // look for 3 words in a row
    }
  );
  return mode;
};
const C_LINE_COMMENT_MODE = COMMENT('//', '$');
const C_BLOCK_COMMENT_MODE = COMMENT('/\\*', '\\*/');
const HASH_COMMENT_MODE = COMMENT('#', '$');
const NUMBER_MODE = {
  scope: 'number',
  begin: NUMBER_RE,
  relevance: 0
};
const C_NUMBER_MODE = {
  scope: 'number',
  begin: C_NUMBER_RE,
  relevance: 0
};
const BINARY_NUMBER_MODE = {
  scope: 'number',
  begin: BINARY_NUMBER_RE,
  relevance: 0
};
const REGEXP_MODE = {
  scope: "regexp",
  begin: /\/(?=[^/\n]*\/)/,
  end: /\/[gimuy]*/,
  contains: [
    BACKSLASH_ESCAPE,
    {
      begin: /\[/,
      end: /\]/,
      relevance: 0,
      contains: [BACKSLASH_ESCAPE]
    }
  ]
};
const TITLE_MODE = {
  scope: 'title',
  begin: IDENT_RE,
  relevance: 0
};
const UNDERSCORE_TITLE_MODE = {
  scope: 'title',
  begin: UNDERSCORE_IDENT_RE,
  relevance: 0
};
const METHOD_GUARD = {
  // excludes method names from keyword processing
  begin: '\\.\\s*' + UNDERSCORE_IDENT_RE,
  relevance: 0
};

/**
 * Adds end same as begin mechanics to a mode
 *
 * Your mode must include at least a single () match group as that first match
 * group is what is used for comparison
 * @param {Partial<Mode>} mode
 */
const END_SAME_AS_BEGIN = function(mode) {
  return Object.assign(mode,
    {
      /** @type {ModeCallback} */
      'on:begin': (m, resp) => { resp.data._beginMatch = m[1]; },
      /** @type {ModeCallback} */
      'on:end': (m, resp) => { if (resp.data._beginMatch !== m[1]) resp.ignoreMatch(); }
    });
};

var MODES = /*#__PURE__*/Object.freeze({
  __proto__: null,
  APOS_STRING_MODE: APOS_STRING_MODE,
  BACKSLASH_ESCAPE: BACKSLASH_ESCAPE,
  BINARY_NUMBER_MODE: BINARY_NUMBER_MODE,
  BINARY_NUMBER_RE: BINARY_NUMBER_RE,
  COMMENT: COMMENT,
  C_BLOCK_COMMENT_MODE: C_BLOCK_COMMENT_MODE,
  C_LINE_COMMENT_MODE: C_LINE_COMMENT_MODE,
  C_NUMBER_MODE: C_NUMBER_MODE,
  C_NUMBER_RE: C_NUMBER_RE,
  END_SAME_AS_BEGIN: END_SAME_AS_BEGIN,
  HASH_COMMENT_MODE: HASH_COMMENT_MODE,
  IDENT_RE: IDENT_RE,
  MATCH_NOTHING_RE: MATCH_NOTHING_RE,
  METHOD_GUARD: METHOD_GUARD,
  NUMBER_MODE: NUMBER_MODE,
  NUMBER_RE: NUMBER_RE,
  PHRASAL_WORDS_MODE: PHRASAL_WORDS_MODE,
  QUOTE_STRING_MODE: QUOTE_STRING_MODE,
  REGEXP_MODE: REGEXP_MODE,
  RE_STARTERS_RE: RE_STARTERS_RE,
  SHEBANG: SHEBANG,
  TITLE_MODE: TITLE_MODE,
  UNDERSCORE_IDENT_RE: UNDERSCORE_IDENT_RE,
  UNDERSCORE_TITLE_MODE: UNDERSCORE_TITLE_MODE
});

/**
@typedef {import('highlight.js').CallbackResponse} CallbackResponse
@typedef {import('highlight.js').CompilerExt} CompilerExt
*/

// Grammar extensions / plugins
// See: https://github.com/highlightjs/highlight.js/issues/2833

// Grammar extensions allow "syntactic sugar" to be added to the grammar modes
// without requiring any underlying changes to the compiler internals.

// `compileMatch` being the perfect small example of now allowing a grammar
// author to write `match` when they desire to match a single expression rather
// than being forced to use `begin`.  The extension then just moves `match` into
// `begin` when it runs.  Ie, no features have been added, but we've just made
// the experience of writing (and reading grammars) a little bit nicer.

// ------

// TODO: We need negative look-behind support to do this properly
/**
 * Skip a match if it has a preceding dot
 *
 * This is used for `beginKeywords` to prevent matching expressions such as
 * `bob.keyword.do()`. The mode compiler automatically wires this up as a
 * special _internal_ 'on:begin' callback for modes with `beginKeywords`
 * @param {RegExpMatchArray} match
 * @param {CallbackResponse} response
 */
function skipIfHasPrecedingDot(match, response) {
  const before = match.input[match.index - 1];
  if (before === ".") {
    response.ignoreMatch();
  }
}

/**
 *
 * @type {CompilerExt}
 */
function scopeClassName(mode, _parent) {
  // eslint-disable-next-line no-undefined
  if (mode.className !== undefined) {
    mode.scope = mode.className;
    delete mode.className;
  }
}

/**
 * `beginKeywords` syntactic sugar
 * @type {CompilerExt}
 */
function beginKeywords(mode, parent) {
  if (!parent) return;
  if (!mode.beginKeywords) return;

  // for languages with keywords that include non-word characters checking for
  // a word boundary is not sufficient, so instead we check for a word boundary
  // or whitespace - this does no harm in any case since our keyword engine
  // doesn't allow spaces in keywords anyways and we still check for the boundary
  // first
  mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')(?!\\.)(?=\\b|\\s)';
  mode.__beforeBegin = skipIfHasPrecedingDot;
  mode.keywords = mode.keywords || mode.beginKeywords;
  delete mode.beginKeywords;

  // prevents double relevance, the keywords themselves provide
  // relevance, the mode doesn't need to double it
  // eslint-disable-next-line no-undefined
  if (mode.relevance === undefined) mode.relevance = 0;
}

/**
 * Allow `illegal` to contain an array of illegal values
 * @type {CompilerExt}
 */
function compileIllegal(mode, _parent) {
  if (!Array.isArray(mode.illegal)) return;

  mode.illegal = either(...mode.illegal);
}

/**
 * `match` to match a single expression for readability
 * @type {CompilerExt}
 */
function compileMatch(mode, _parent) {
  if (!mode.match) return;
  if (mode.begin || mode.end) throw new Error("begin & end are not supported with match");

  mode.begin = mode.match;
  delete mode.match;
}

/**
 * provides the default 1 relevance to all modes
 * @type {CompilerExt}
 */
function compileRelevance(mode, _parent) {
  // eslint-disable-next-line no-undefined
  if (mode.relevance === undefined) mode.relevance = 1;
}

// allow beforeMatch to act as a "qualifier" for the match
// the full match begin must be [beforeMatch][begin]
const beforeMatchExt = (mode, parent) => {
  if (!mode.beforeMatch) return;
  // starts conflicts with endsParent which we need to make sure the child
  // rule is not matched multiple times
  if (mode.starts) throw new Error("beforeMatch cannot be used with starts");

  const originalMode = Object.assign({}, mode);
  Object.keys(mode).forEach((key) => { delete mode[key]; });

  mode.keywords = originalMode.keywords;
  mode.begin = concat(originalMode.beforeMatch, lookahead(originalMode.begin));
  mode.starts = {
    relevance: 0,
    contains: [
      Object.assign(originalMode, { endsParent: true })
    ]
  };
  mode.relevance = 0;

  delete originalMode.beforeMatch;
};

// keywords that should have no default relevance value
const COMMON_KEYWORDS = [
  'of',
  'and',
  'for',
  'in',
  'not',
  'or',
  'if',
  'then',
  'parent', // common variable name
  'list', // common variable name
  'value' // common variable name
];

const DEFAULT_KEYWORD_SCOPE = "keyword";

/**
 * Given raw keywords from a language definition, compile them.
 *
 * @param {string | Record<string,string|string[]> | Array<string>} rawKeywords
 * @param {boolean} caseInsensitive
 */
function compileKeywords(rawKeywords, caseInsensitive, scopeName = DEFAULT_KEYWORD_SCOPE) {
  /** @type {import("highlight.js/private").KeywordDict} */
  const compiledKeywords = Object.create(null);

  // input can be a string of keywords, an array of keywords, or a object with
  // named keys representing scopeName (which can then point to a string or array)
  if (typeof rawKeywords === 'string') {
    compileList(scopeName, rawKeywords.split(" "));
  } else if (Array.isArray(rawKeywords)) {
    compileList(scopeName, rawKeywords);
  } else {
    Object.keys(rawKeywords).forEach(function(scopeName) {
      // collapse all our objects back into the parent object
      Object.assign(
        compiledKeywords,
        compileKeywords(rawKeywords[scopeName], caseInsensitive, scopeName)
      );
    });
  }
  return compiledKeywords;

  // ---

  /**
   * Compiles an individual list of keywords
   *
   * Ex: "for if when while|5"
   *
   * @param {string} scopeName
   * @param {Array<string>} keywordList
   */
  function compileList(scopeName, keywordList) {
    if (caseInsensitive) {
      keywordList = keywordList.map(x => x.toLowerCase());
    }
    keywordList.forEach(function(keyword) {
      const pair = keyword.split('|');
      compiledKeywords[pair[0]] = [scopeName, scoreForKeyword(pair[0], pair[1])];
    });
  }
}

/**
 * Returns the proper score for a given keyword
 *
 * Also takes into account comment keywords, which will be scored 0 UNLESS
 * another score has been manually assigned.
 * @param {string} keyword
 * @param {string} [providedScore]
 */
function scoreForKeyword(keyword, providedScore) {
  // manual scores always win over common keywords
  // so you can force a score of 1 if you really insist
  if (providedScore) {
    return Number(providedScore);
  }

  return commonKeyword(keyword) ? 0 : 1;
}

/**
 * Determines if a given keyword is common or not
 *
 * @param {string} keyword */
function commonKeyword(keyword) {
  return COMMON_KEYWORDS.includes(keyword.toLowerCase());
}

/*

For the reasoning behind this please see:
https://github.com/highlightjs/highlight.js/issues/2880#issuecomment-747275419

*/

/**
 * @type {Record<string, boolean>}
 */
const seenDeprecations = {};

/**
 * @param {string} message
 */
const error = (message) => {
  console.error(message);
};

/**
 * @param {string} message
 * @param {any} args
 */
const warn = (message, ...args) => {
  console.log(`WARN: ${message}`, ...args);
};

/**
 * @param {string} version
 * @param {string} message
 */
const deprecated = (version, message) => {
  if (seenDeprecations[`${version}/${message}`]) return;

  console.log(`Deprecated as of ${version}. ${message}`);
  seenDeprecations[`${version}/${message}`] = true;
};

/* eslint-disable no-throw-literal */

/**
@typedef {import('highlight.js').CompiledMode} CompiledMode
*/

const MultiClassError = new Error();

/**
 * Renumbers labeled scope names to account for additional inner match
 * groups that otherwise would break everything.
 *
 * Lets say we 3 match scopes:
 *
 *   { 1 => ..., 2 => ..., 3 => ... }
 *
 * So what we need is a clean match like this:
 *
 *   (a)(b)(c) => [ "a", "b", "c" ]
 *
 * But this falls apart with inner match groups:
 *
 * (a)(((b)))(c) => ["a", "b", "b", "b", "c" ]
 *
 * Our scopes are now "out of alignment" and we're repeating `b` 3 times.
 * What needs to happen is the numbers are remapped:
 *
 *   { 1 => ..., 2 => ..., 5 => ... }
 *
 * We also need to know that the ONLY groups that should be output
 * are 1, 2, and 5.  This function handles this behavior.
 *
 * @param {CompiledMode} mode
 * @param {Array<RegExp | string>} regexes
 * @param {{key: "beginScope"|"endScope"}} opts
 */
function remapScopeNames(mode, regexes, { key }) {
  let offset = 0;
  const scopeNames = mode[key];
  /** @type Record<number,boolean> */
  const emit = {};
  /** @type Record<number,string> */
  const positions = {};

  for (let i = 1; i <= regexes.length; i++) {
    positions[i + offset] = scopeNames[i];
    emit[i + offset] = true;
    offset += countMatchGroups(regexes[i - 1]);
  }
  // we use _emit to keep track of which match groups are "top-level" to avoid double
  // output from inside match groups
  mode[key] = positions;
  mode[key]._emit = emit;
  mode[key]._multi = true;
}

/**
 * @param {CompiledMode} mode
 */
function beginMultiClass(mode) {
  if (!Array.isArray(mode.begin)) return;

  if (mode.skip || mode.excludeBegin || mode.returnBegin) {
    error("skip, excludeBegin, returnBegin not compatible with beginScope: {}");
    throw MultiClassError;
  }

  if (typeof mode.beginScope !== "object" || mode.beginScope === null) {
    error("beginScope must be object");
    throw MultiClassError;
  }

  remapScopeNames(mode, mode.begin, { key: "beginScope" });
  mode.begin = _rewriteBackreferences(mode.begin, { joinWith: "" });
}

/**
 * @param {CompiledMode} mode
 */
function endMultiClass(mode) {
  if (!Array.isArray(mode.end)) return;

  if (mode.skip || mode.excludeEnd || mode.returnEnd) {
    error("skip, excludeEnd, returnEnd not compatible with endScope: {}");
    throw MultiClassError;
  }

  if (typeof mode.endScope !== "object" || mode.endScope === null) {
    error("endScope must be object");
    throw MultiClassError;
  }

  remapScopeNames(mode, mode.end, { key: "endScope" });
  mode.end = _rewriteBackreferences(mode.end, { joinWith: "" });
}

/**
 * this exists only to allow `scope: {}` to be used beside `match:`
 * Otherwise `beginScope` would necessary and that would look weird

  {
    match: [ /def/, /\w+/ ]
    scope: { 1: "keyword" , 2: "title" }
  }

 * @param {CompiledMode} mode
 */
function scopeSugar(mode) {
  if (mode.scope && typeof mode.scope === "object" && mode.scope !== null) {
    mode.beginScope = mode.scope;
    delete mode.scope;
  }
}

/**
 * @param {CompiledMode} mode
 */
function MultiClass(mode) {
  scopeSugar(mode);

  if (typeof mode.beginScope === "string") {
    mode.beginScope = { _wrap: mode.beginScope };
  }
  if (typeof mode.endScope === "string") {
    mode.endScope = { _wrap: mode.endScope };
  }

  beginMultiClass(mode);
  endMultiClass(mode);
}

/**
@typedef {import('highlight.js').Mode} Mode
@typedef {import('highlight.js').CompiledMode} CompiledMode
@typedef {import('highlight.js').Language} Language
@typedef {import('highlight.js').HLJSPlugin} HLJSPlugin
@typedef {import('highlight.js').CompiledLanguage} CompiledLanguage
*/

// compilation

/**
 * Compiles a language definition result
 *
 * Given the raw result of a language definition (Language), compiles this so
 * that it is ready for highlighting code.
 * @param {Language} language
 * @returns {CompiledLanguage}
 */
function compileLanguage(language) {
  /**
   * Builds a regex with the case sensitivity of the current language
   *
   * @param {RegExp | string} value
   * @param {boolean} [global]
   */
  function langRe(value, global) {
    return new RegExp(
      source(value),
      'm'
      + (language.case_insensitive ? 'i' : '')
      + (language.unicodeRegex ? 'u' : '')
      + (global ? 'g' : '')
    );
  }

  /**
    Stores multiple regular expressions and allows you to quickly search for
    them all in a string simultaneously - returning the first match.  It does
    this by creating a huge (a|b|c) regex - each individual item wrapped with ()
    and joined by `|` - using match groups to track position.  When a match is
    found checking which position in the array has content allows us to figure
    out which of the original regexes / match groups triggered the match.

    The match object itself (the result of `Regex.exec`) is returned but also
    enhanced by merging in any meta-data that was registered with the regex.
    This is how we keep track of which mode matched, and what type of rule
    (`illegal`, `begin`, end, etc).
  */
  class MultiRegex {
    constructor() {
      this.matchIndexes = {};
      // @ts-ignore
      this.regexes = [];
      this.matchAt = 1;
      this.position = 0;
    }

    // @ts-ignore
    addRule(re, opts) {
      opts.position = this.position++;
      // @ts-ignore
      this.matchIndexes[this.matchAt] = opts;
      this.regexes.push([opts, re]);
      this.matchAt += countMatchGroups(re) + 1;
    }

    compile() {
      if (this.regexes.length === 0) {
        // avoids the need to check length every time exec is called
        // @ts-ignore
        this.exec = () => null;
      }
      const terminators = this.regexes.map(el => el[1]);
      this.matcherRe = langRe(_rewriteBackreferences(terminators, { joinWith: '|' }), true);
      this.lastIndex = 0;
    }

    /** @param {string} s */
    exec(s) {
      this.matcherRe.lastIndex = this.lastIndex;
      const match = this.matcherRe.exec(s);
      if (!match) { return null; }

      // eslint-disable-next-line no-undefined
      const i = match.findIndex((el, i) => i > 0 && el !== undefined);
      // @ts-ignore
      const matchData = this.matchIndexes[i];
      // trim off any earlier non-relevant match groups (ie, the other regex
      // match groups that make up the multi-matcher)
      match.splice(0, i);

      return Object.assign(match, matchData);
    }
  }

  /*
    Created to solve the key deficiently with MultiRegex - there is no way to
    test for multiple matches at a single location.  Why would we need to do
    that?  In the future a more dynamic engine will allow certain matches to be
    ignored.  An example: if we matched say the 3rd regex in a large group but
    decided to ignore it - we'd need to started testing again at the 4th
    regex... but MultiRegex itself gives us no real way to do that.

    So what this class creates MultiRegexs on the fly for whatever search
    position they are needed.

    NOTE: These additional MultiRegex objects are created dynamically.  For most
    grammars most of the time we will never actually need anything more than the
    first MultiRegex - so this shouldn't have too much overhead.

    Say this is our search group, and we match regex3, but wish to ignore it.

      regex1 | regex2 | regex3 | regex4 | regex5    ' ie, startAt = 0

    What we need is a new MultiRegex that only includes the remaining
    possibilities:

      regex4 | regex5                               ' ie, startAt = 3

    This class wraps all that complexity up in a simple API... `startAt` decides
    where in the array of expressions to start doing the matching. It
    auto-increments, so if a match is found at position 2, then startAt will be
    set to 3.  If the end is reached startAt will return to 0.

    MOST of the time the parser will be setting startAt manually to 0.
  */
  class ResumableMultiRegex {
    constructor() {
      // @ts-ignore
      this.rules = [];
      // @ts-ignore
      this.multiRegexes = [];
      this.count = 0;

      this.lastIndex = 0;
      this.regexIndex = 0;
    }

    // @ts-ignore
    getMatcher(index) {
      if (this.multiRegexes[index]) return this.multiRegexes[index];

      const matcher = new MultiRegex();
      this.rules.slice(index).forEach(([re, opts]) => matcher.addRule(re, opts));
      matcher.compile();
      this.multiRegexes[index] = matcher;
      return matcher;
    }

    resumingScanAtSamePosition() {
      return this.regexIndex !== 0;
    }

    considerAll() {
      this.regexIndex = 0;
    }

    // @ts-ignore
    addRule(re, opts) {
      this.rules.push([re, opts]);
      if (opts.type === "begin") this.count++;
    }

    /** @param {string} s */
    exec(s) {
      const m = this.getMatcher(this.regexIndex);
      m.lastIndex = this.lastIndex;
      let result = m.exec(s);

      // The following is because we have no easy way to say "resume scanning at the
      // existing position but also skip the current rule ONLY". What happens is
      // all prior rules are also skipped which can result in matching the wrong
      // thing. Example of matching "booger":

      // our matcher is [string, "booger", number]
      //
      // ....booger....

      // if "booger" is ignored then we'd really need a regex to scan from the
      // SAME position for only: [string, number] but ignoring "booger" (if it
      // was the first match), a simple resume would scan ahead who knows how
      // far looking only for "number", ignoring potential string matches (or
      // future "booger" matches that might be valid.)

      // So what we do: We execute two matchers, one resuming at the same
      // position, but the second full matcher starting at the position after:

      //     /--- resume first regex match here (for [number])
      //     |/---- full match here for [string, "booger", number]
      //     vv
      // ....booger....

      // Which ever results in a match first is then used. So this 3-4 step
      // process essentially allows us to say "match at this position, excluding
      // a prior rule that was ignored".
      //
      // 1. Match "booger" first, ignore. Also proves that [string] does non match.
      // 2. Resume matching for [number]
      // 3. Match at index + 1 for [string, "booger", number]
      // 4. If #2 and #3 result in matches, which came first?
      if (this.resumingScanAtSamePosition()) {
        if (result && result.index === this.lastIndex) ; else { // use the second matcher result
          const m2 = this.getMatcher(0);
          m2.lastIndex = this.lastIndex + 1;
          result = m2.exec(s);
        }
      }

      if (result) {
        this.regexIndex += result.position + 1;
        if (this.regexIndex === this.count) {
          // wrap-around to considering all matches again
          this.considerAll();
        }
      }

      return result;
    }
  }

  /**
   * Given a mode, builds a huge ResumableMultiRegex that can be used to walk
   * the content and find matches.
   *
   * @param {CompiledMode} mode
   * @returns {ResumableMultiRegex}
   */
  function buildModeRegex(mode) {
    const mm = new ResumableMultiRegex();

    mode.contains.forEach(term => mm.addRule(term.begin, { rule: term, type: "begin" }));

    if (mode.terminatorEnd) {
      mm.addRule(mode.terminatorEnd, { type: "end" });
    }
    if (mode.illegal) {
      mm.addRule(mode.illegal, { type: "illegal" });
    }

    return mm;
  }

  /** skip vs abort vs ignore
   *
   * @skip   - The mode is still entered and exited normally (and contains rules apply),
   *           but all content is held and added to the parent buffer rather than being
   *           output when the mode ends.  Mostly used with `sublanguage` to build up
   *           a single large buffer than can be parsed by sublanguage.
   *
   *             - The mode begin ands ends normally.
   *             - Content matched is added to the parent mode buffer.
   *             - The parser cursor is moved forward normally.
   *
   * @abort  - A hack placeholder until we have ignore.  Aborts the mode (as if it
   *           never matched) but DOES NOT continue to match subsequent `contains`
   *           modes.  Abort is bad/suboptimal because it can result in modes
   *           farther down not getting applied because an earlier rule eats the
   *           content but then aborts.
   *
   *             - The mode does not begin.
   *             - Content matched by `begin` is added to the mode buffer.
   *             - The parser cursor is moved forward accordingly.
   *
   * @ignore - Ignores the mode (as if it never matched) and continues to match any
   *           subsequent `contains` modes.  Ignore isn't technically possible with
   *           the current parser implementation.
   *
   *             - The mode does not begin.
   *             - Content matched by `begin` is ignored.
   *             - The parser cursor is not moved forward.
   */

  /**
   * Compiles an individual mode
   *
   * This can raise an error if the mode contains certain detectable known logic
   * issues.
   * @param {Mode} mode
   * @param {CompiledMode | null} [parent]
   * @returns {CompiledMode | never}
   */
  function compileMode(mode, parent) {
    const cmode = /** @type CompiledMode */ (mode);
    if (mode.isCompiled) return cmode;

    [
      scopeClassName,
      // do this early so compiler extensions generally don't have to worry about
      // the distinction between match/begin
      compileMatch,
      MultiClass,
      beforeMatchExt
    ].forEach(ext => ext(mode, parent));

    language.compilerExtensions.forEach(ext => ext(mode, parent));

    // __beforeBegin is considered private API, internal use only
    mode.__beforeBegin = null;

    [
      beginKeywords,
      // do this later so compiler extensions that come earlier have access to the
      // raw array if they wanted to perhaps manipulate it, etc.
      compileIllegal,
      // default to 1 relevance if not specified
      compileRelevance
    ].forEach(ext => ext(mode, parent));

    mode.isCompiled = true;

    let keywordPattern = null;
    if (typeof mode.keywords === "object" && mode.keywords.$pattern) {
      // we need a copy because keywords might be compiled multiple times
      // so we can't go deleting $pattern from the original on the first
      // pass
      mode.keywords = Object.assign({}, mode.keywords);
      keywordPattern = mode.keywords.$pattern;
      delete mode.keywords.$pattern;
    }
    keywordPattern = keywordPattern || /\w+/;

    if (mode.keywords) {
      mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);
    }

    cmode.keywordPatternRe = langRe(keywordPattern, true);

    if (parent) {
      if (!mode.begin) mode.begin = /\B|\b/;
      cmode.beginRe = langRe(cmode.begin);
      if (!mode.end && !mode.endsWithParent) mode.end = /\B|\b/;
      if (mode.end) cmode.endRe = langRe(cmode.end);
      cmode.terminatorEnd = source(cmode.end) || '';
      if (mode.endsWithParent && parent.terminatorEnd) {
        cmode.terminatorEnd += (mode.end ? '|' : '') + parent.terminatorEnd;
      }
    }
    if (mode.illegal) cmode.illegalRe = langRe(/** @type {RegExp | string} */ (mode.illegal));
    if (!mode.contains) mode.contains = [];

    mode.contains = [].concat(...mode.contains.map(function(c) {
      return expandOrCloneMode(c === 'self' ? mode : c);
    }));
    mode.contains.forEach(function(c) { compileMode(/** @type Mode */ (c), cmode); });

    if (mode.starts) {
      compileMode(mode.starts, parent);
    }

    cmode.matcher = buildModeRegex(cmode);
    return cmode;
  }

  if (!language.compilerExtensions) language.compilerExtensions = [];

  // self is not valid at the top-level
  if (language.contains && language.contains.includes('self')) {
    throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
  }

  // we need a null object, which inherit will guarantee
  language.classNameAliases = inherit$1(language.classNameAliases || {});

  return compileMode(/** @type Mode */ (language));
}

/**
 * Determines if a mode has a dependency on it's parent or not
 *
 * If a mode does have a parent dependency then often we need to clone it if
 * it's used in multiple places so that each copy points to the correct parent,
 * where-as modes without a parent can often safely be re-used at the bottom of
 * a mode chain.
 *
 * @param {Mode | null} mode
 * @returns {boolean} - is there a dependency on the parent?
 * */
function dependencyOnParent(mode) {
  if (!mode) return false;

  return mode.endsWithParent || dependencyOnParent(mode.starts);
}

/**
 * Expands a mode or clones it if necessary
 *
 * This is necessary for modes with parental dependenceis (see notes on
 * `dependencyOnParent`) and for nodes that have `variants` - which must then be
 * exploded into their own individual modes at compile time.
 *
 * @param {Mode} mode
 * @returns {Mode | Mode[]}
 * */
function expandOrCloneMode(mode) {
  if (mode.variants && !mode.cachedVariants) {
    mode.cachedVariants = mode.variants.map(function(variant) {
      return inherit$1(mode, { variants: null }, variant);
    });
  }

  // EXPAND
  // if we have variants then essentially "replace" the mode with the variants
  // this happens in compileMode, where this function is called from
  if (mode.cachedVariants) {
    return mode.cachedVariants;
  }

  // CLONE
  // if we have dependencies on parents then we need a unique
  // instance of ourselves, so we can be reused with many
  // different parents without issue
  if (dependencyOnParent(mode)) {
    return inherit$1(mode, { starts: mode.starts ? inherit$1(mode.starts) : null });
  }

  if (Object.isFrozen(mode)) {
    return inherit$1(mode);
  }

  // no special dependency issues, just return ourselves
  return mode;
}

var version = "11.11.1";

class HTMLInjectionError extends Error {
  constructor(reason, html) {
    super(reason);
    this.name = "HTMLInjectionError";
    this.html = html;
  }
}

/*
Syntax highlighting with language autodetection.
https://highlightjs.org/
*/



/**
@typedef {import('highlight.js').Mode} Mode
@typedef {import('highlight.js').CompiledMode} CompiledMode
@typedef {import('highlight.js').CompiledScope} CompiledScope
@typedef {import('highlight.js').Language} Language
@typedef {import('highlight.js').HLJSApi} HLJSApi
@typedef {import('highlight.js').HLJSPlugin} HLJSPlugin
@typedef {import('highlight.js').PluginEvent} PluginEvent
@typedef {import('highlight.js').HLJSOptions} HLJSOptions
@typedef {import('highlight.js').LanguageFn} LanguageFn
@typedef {import('highlight.js').HighlightedHTMLElement} HighlightedHTMLElement
@typedef {import('highlight.js').BeforeHighlightContext} BeforeHighlightContext
@typedef {import('highlight.js/private').MatchType} MatchType
@typedef {import('highlight.js/private').KeywordData} KeywordData
@typedef {import('highlight.js/private').EnhancedMatch} EnhancedMatch
@typedef {import('highlight.js/private').AnnotatedError} AnnotatedError
@typedef {import('highlight.js').AutoHighlightResult} AutoHighlightResult
@typedef {import('highlight.js').HighlightOptions} HighlightOptions
@typedef {import('highlight.js').HighlightResult} HighlightResult
*/


const escape = escapeHTML;
const inherit = inherit$1;
const NO_MATCH = Symbol("nomatch");
const MAX_KEYWORD_HITS = 7;

/**
 * @param {any} hljs - object that is extended (legacy)
 * @returns {HLJSApi}
 */
const HLJS = function(hljs) {
  // Global internal variables used within the highlight.js library.
  /** @type {Record<string, Language>} */
  const languages = Object.create(null);
  /** @type {Record<string, string>} */
  const aliases = Object.create(null);
  /** @type {HLJSPlugin[]} */
  const plugins = [];

  // safe/production mode - swallows more errors, tries to keep running
  // even if a single syntax or parse hits a fatal error
  let SAFE_MODE = true;
  const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
  /** @type {Language} */
  const PLAINTEXT_LANGUAGE = { disableAutodetect: true, name: 'Plain text', contains: [] };

  // Global options used when within external APIs. This is modified when
  // calling the `hljs.configure` function.
  /** @type HLJSOptions */
  let options = {
    ignoreUnescapedHTML: false,
    throwUnescapedHTML: false,
    noHighlightRe: /^(no-?highlight)$/i,
    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
    classPrefix: 'hljs-',
    cssSelector: 'pre code',
    languages: null,
    // beta configuration options, subject to change, welcome to discuss
    // https://github.com/highlightjs/highlight.js/issues/1086
    __emitter: TokenTreeEmitter
  };

  /* Utility functions */

  /**
   * Tests a language name to see if highlighting should be skipped
   * @param {string} languageName
   */
  function shouldNotHighlight(languageName) {
    return options.noHighlightRe.test(languageName);
  }

  /**
   * @param {HighlightedHTMLElement} block - the HTML element to determine language for
   */
  function blockLanguage(block) {
    let classes = block.className + ' ';

    classes += block.parentNode ? block.parentNode.className : '';

    // language-* takes precedence over non-prefixed class names.
    const match = options.languageDetectRe.exec(classes);
    if (match) {
      const language = getLanguage(match[1]);
      if (!language) {
        warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
        warn("Falling back to no-highlight mode for this block.", block);
      }
      return language ? match[1] : 'no-highlight';
    }

    return classes
      .split(/\s+/)
      .find((_class) => shouldNotHighlight(_class) || getLanguage(_class));
  }

  /**
   * Core highlighting function.
   *
   * OLD API
   * highlight(lang, code, ignoreIllegals, continuation)
   *
   * NEW API
   * highlight(code, {lang, ignoreIllegals})
   *
   * @param {string} codeOrLanguageName - the language to use for highlighting
   * @param {string | HighlightOptions} optionsOrCode - the code to highlight
   * @param {boolean} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
   *
   * @returns {HighlightResult} Result - an object that represents the result
   * @property {string} language - the language name
   * @property {number} relevance - the relevance score
   * @property {string} value - the highlighted HTML code
   * @property {string} code - the original raw code
   * @property {CompiledMode} top - top of the current mode stack
   * @property {boolean} illegal - indicates whether any illegal matches were found
  */
  function highlight(codeOrLanguageName, optionsOrCode, ignoreIllegals) {
    let code = "";
    let languageName = "";
    if (typeof optionsOrCode === "object") {
      code = codeOrLanguageName;
      ignoreIllegals = optionsOrCode.ignoreIllegals;
      languageName = optionsOrCode.language;
    } else {
      // old API
      deprecated("10.7.0", "highlight(lang, code, ...args) has been deprecated.");
      deprecated("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277");
      languageName = codeOrLanguageName;
      code = optionsOrCode;
    }

    // https://github.com/highlightjs/highlight.js/issues/3149
    // eslint-disable-next-line no-undefined
    if (ignoreIllegals === undefined) { ignoreIllegals = true; }

    /** @type {BeforeHighlightContext} */
    const context = {
      code,
      language: languageName
    };
    // the plugin can change the desired language or the code to be highlighted
    // just be changing the object it was passed
    fire("before:highlight", context);

    // a before plugin can usurp the result completely by providing it's own
    // in which case we don't even need to call highlight
    const result = context.result
      ? context.result
      : _highlight(context.language, context.code, ignoreIllegals);

    result.code = context.code;
    // the plugin can change anything in result to suite it
    fire("after:highlight", result);

    return result;
  }

  /**
   * private highlight that's used internally and does not fire callbacks
   *
   * @param {string} languageName - the language to use for highlighting
   * @param {string} codeToHighlight - the code to highlight
   * @param {boolean?} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
   * @param {CompiledMode?} [continuation] - current continuation mode, if any
   * @returns {HighlightResult} - result of the highlight operation
  */
  function _highlight(languageName, codeToHighlight, ignoreIllegals, continuation) {
    const keywordHits = Object.create(null);

    /**
     * Return keyword data if a match is a keyword
     * @param {CompiledMode} mode - current mode
     * @param {string} matchText - the textual match
     * @returns {KeywordData | false}
     */
    function keywordData(mode, matchText) {
      return mode.keywords[matchText];
    }

    function processKeywords() {
      if (!top.keywords) {
        emitter.addText(modeBuffer);
        return;
      }

      let lastIndex = 0;
      top.keywordPatternRe.lastIndex = 0;
      let match = top.keywordPatternRe.exec(modeBuffer);
      let buf = "";

      while (match) {
        buf += modeBuffer.substring(lastIndex, match.index);
        const word = language.case_insensitive ? match[0].toLowerCase() : match[0];
        const data = keywordData(top, word);
        if (data) {
          const [kind, keywordRelevance] = data;
          emitter.addText(buf);
          buf = "";

          keywordHits[word] = (keywordHits[word] || 0) + 1;
          if (keywordHits[word] <= MAX_KEYWORD_HITS) relevance += keywordRelevance;
          if (kind.startsWith("_")) {
            // _ implied for relevance only, do not highlight
            // by applying a class name
            buf += match[0];
          } else {
            const cssClass = language.classNameAliases[kind] || kind;
            emitKeyword(match[0], cssClass);
          }
        } else {
          buf += match[0];
        }
        lastIndex = top.keywordPatternRe.lastIndex;
        match = top.keywordPatternRe.exec(modeBuffer);
      }
      buf += modeBuffer.substring(lastIndex);
      emitter.addText(buf);
    }

    function processSubLanguage() {
      if (modeBuffer === "") return;
      /** @type HighlightResult */
      let result = null;

      if (typeof top.subLanguage === 'string') {
        if (!languages[top.subLanguage]) {
          emitter.addText(modeBuffer);
          return;
        }
        result = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);
        continuations[top.subLanguage] = /** @type {CompiledMode} */ (result._top);
      } else {
        result = highlightAuto(modeBuffer, top.subLanguage.length ? top.subLanguage : null);
      }

      // Counting embedded language score towards the host language may be disabled
      // with zeroing the containing mode relevance. Use case in point is Markdown that
      // allows XML everywhere and makes every XML snippet to have a much larger Markdown
      // score.
      if (top.relevance > 0) {
        relevance += result.relevance;
      }
      emitter.__addSublanguage(result._emitter, result.language);
    }

    function processBuffer() {
      if (top.subLanguage != null) {
        processSubLanguage();
      } else {
        processKeywords();
      }
      modeBuffer = '';
    }

    /**
     * @param {string} text
     * @param {string} scope
     */
    function emitKeyword(keyword, scope) {
      if (keyword === "") return;

      emitter.startScope(scope);
      emitter.addText(keyword);
      emitter.endScope();
    }

    /**
     * @param {CompiledScope} scope
     * @param {RegExpMatchArray} match
     */
    function emitMultiClass(scope, match) {
      let i = 1;
      const max = match.length - 1;
      while (i <= max) {
        if (!scope._emit[i]) { i++; continue; }
        const klass = language.classNameAliases[scope[i]] || scope[i];
        const text = match[i];
        if (klass) {
          emitKeyword(text, klass);
        } else {
          modeBuffer = text;
          processKeywords();
          modeBuffer = "";
        }
        i++;
      }
    }

    /**
     * @param {CompiledMode} mode - new mode to start
     * @param {RegExpMatchArray} match
     */
    function startNewMode(mode, match) {
      if (mode.scope && typeof mode.scope === "string") {
        emitter.openNode(language.classNameAliases[mode.scope] || mode.scope);
      }
      if (mode.beginScope) {
        // beginScope just wraps the begin match itself in a scope
        if (mode.beginScope._wrap) {
          emitKeyword(modeBuffer, language.classNameAliases[mode.beginScope._wrap] || mode.beginScope._wrap);
          modeBuffer = "";
        } else if (mode.beginScope._multi) {
          // at this point modeBuffer should just be the match
          emitMultiClass(mode.beginScope, match);
          modeBuffer = "";
        }
      }

      top = Object.create(mode, { parent: { value: top } });
      return top;
    }

    /**
     * @param {CompiledMode } mode - the mode to potentially end
     * @param {RegExpMatchArray} match - the latest match
     * @param {string} matchPlusRemainder - match plus remainder of content
     * @returns {CompiledMode | void} - the next mode, or if void continue on in current mode
     */
    function endOfMode(mode, match, matchPlusRemainder) {
      let matched = startsWith(mode.endRe, matchPlusRemainder);

      if (matched) {
        if (mode["on:end"]) {
          const resp = new Response(mode);
          mode["on:end"](match, resp);
          if (resp.isMatchIgnored) matched = false;
        }

        if (matched) {
          while (mode.endsParent && mode.parent) {
            mode = mode.parent;
          }
          return mode;
        }
      }
      // even if on:end fires an `ignore` it's still possible
      // that we might trigger the end node because of a parent mode
      if (mode.endsWithParent) {
        return endOfMode(mode.parent, match, matchPlusRemainder);
      }
    }

    /**
     * Handle matching but then ignoring a sequence of text
     *
     * @param {string} lexeme - string containing full match text
     */
    function doIgnore(lexeme) {
      if (top.matcher.regexIndex === 0) {
        // no more regexes to potentially match here, so we move the cursor forward one
        // space
        modeBuffer += lexeme[0];
        return 1;
      } else {
        // no need to move the cursor, we still have additional regexes to try and
        // match at this very spot
        resumeScanAtSamePosition = true;
        return 0;
      }
    }

    /**
     * Handle the start of a new potential mode match
     *
     * @param {EnhancedMatch} match - the current match
     * @returns {number} how far to advance the parse cursor
     */
    function doBeginMatch(match) {
      const lexeme = match[0];
      const newMode = match.rule;

      const resp = new Response(newMode);
      // first internal before callbacks, then the public ones
      const beforeCallbacks = [newMode.__beforeBegin, newMode["on:begin"]];
      for (const cb of beforeCallbacks) {
        if (!cb) continue;
        cb(match, resp);
        if (resp.isMatchIgnored) return doIgnore(lexeme);
      }

      if (newMode.skip) {
        modeBuffer += lexeme;
      } else {
        if (newMode.excludeBegin) {
          modeBuffer += lexeme;
        }
        processBuffer();
        if (!newMode.returnBegin && !newMode.excludeBegin) {
          modeBuffer = lexeme;
        }
      }
      startNewMode(newMode, match);
      return newMode.returnBegin ? 0 : lexeme.length;
    }

    /**
     * Handle the potential end of mode
     *
     * @param {RegExpMatchArray} match - the current match
     */
    function doEndMatch(match) {
      const lexeme = match[0];
      const matchPlusRemainder = codeToHighlight.substring(match.index);

      const endMode = endOfMode(top, match, matchPlusRemainder);
      if (!endMode) { return NO_MATCH; }

      const origin = top;
      if (top.endScope && top.endScope._wrap) {
        processBuffer();
        emitKeyword(lexeme, top.endScope._wrap);
      } else if (top.endScope && top.endScope._multi) {
        processBuffer();
        emitMultiClass(top.endScope, match);
      } else if (origin.skip) {
        modeBuffer += lexeme;
      } else {
        if (!(origin.returnEnd || origin.excludeEnd)) {
          modeBuffer += lexeme;
        }
        processBuffer();
        if (origin.excludeEnd) {
          modeBuffer = lexeme;
        }
      }
      do {
        if (top.scope) {
          emitter.closeNode();
        }
        if (!top.skip && !top.subLanguage) {
          relevance += top.relevance;
        }
        top = top.parent;
      } while (top !== endMode.parent);
      if (endMode.starts) {
        startNewMode(endMode.starts, match);
      }
      return origin.returnEnd ? 0 : lexeme.length;
    }

    function processContinuations() {
      const list = [];
      for (let current = top; current !== language; current = current.parent) {
        if (current.scope) {
          list.unshift(current.scope);
        }
      }
      list.forEach(item => emitter.openNode(item));
    }

    /** @type {{type?: MatchType, index?: number, rule?: Mode}}} */
    let lastMatch = {};

    /**
     *  Process an individual match
     *
     * @param {string} textBeforeMatch - text preceding the match (since the last match)
     * @param {EnhancedMatch} [match] - the match itself
     */
    function processLexeme(textBeforeMatch, match) {
      const lexeme = match && match[0];

      // add non-matched text to the current mode buffer
      modeBuffer += textBeforeMatch;

      if (lexeme == null) {
        processBuffer();
        return 0;
      }

      // we've found a 0 width match and we're stuck, so we need to advance
      // this happens when we have badly behaved rules that have optional matchers to the degree that
      // sometimes they can end up matching nothing at all
      // Ref: https://github.com/highlightjs/highlight.js/issues/2140
      if (lastMatch.type === "begin" && match.type === "end" && lastMatch.index === match.index && lexeme === "") {
        // spit the "skipped" character that our regex choked on back into the output sequence
        modeBuffer += codeToHighlight.slice(match.index, match.index + 1);
        if (!SAFE_MODE) {
          /** @type {AnnotatedError} */
          const err = new Error(`0 width match regex (${languageName})`);
          err.languageName = languageName;
          err.badRule = lastMatch.rule;
          throw err;
        }
        return 1;
      }
      lastMatch = match;

      if (match.type === "begin") {
        return doBeginMatch(match);
      } else if (match.type === "illegal" && !ignoreIllegals) {
        // illegal match, we do not continue processing
        /** @type {AnnotatedError} */
        const err = new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.scope || '<unnamed>') + '"');
        err.mode = top;
        throw err;
      } else if (match.type === "end") {
        const processed = doEndMatch(match);
        if (processed !== NO_MATCH) {
          return processed;
        }
      }

      // edge case for when illegal matches $ (end of line) which is technically
      // a 0 width match but not a begin/end match so it's not caught by the
      // first handler (when ignoreIllegals is true)
      if (match.type === "illegal" && lexeme === "") {
        // advance so we aren't stuck in an infinite loop
        modeBuffer += "\n";
        return 1;
      }

      // infinite loops are BAD, this is a last ditch catch all. if we have a
      // decent number of iterations yet our index (cursor position in our
      // parsing) still 3x behind our index then something is very wrong
      // so we bail
      if (iterations > 100000 && iterations > match.index * 3) {
        const err = new Error('potential infinite loop, way more iterations than matches');
        throw err;
      }

      /*
      Why might be find ourselves here?  An potential end match that was
      triggered but could not be completed.  IE, `doEndMatch` returned NO_MATCH.
      (this could be because a callback requests the match be ignored, etc)

      This causes no real harm other than stopping a few times too many.
      */

      modeBuffer += lexeme;
      return lexeme.length;
    }

    const language = getLanguage(languageName);
    if (!language) {
      error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
      throw new Error('Unknown language: "' + languageName + '"');
    }

    const md = compileLanguage(language);
    let result = '';
    /** @type {CompiledMode} */
    let top = continuation || md;
    /** @type Record<string,CompiledMode> */
    const continuations = {}; // keep continuations for sub-languages
    const emitter = new options.__emitter(options);
    processContinuations();
    let modeBuffer = '';
    let relevance = 0;
    let index = 0;
    let iterations = 0;
    let resumeScanAtSamePosition = false;

    try {
      if (!language.__emitTokens) {
        top.matcher.considerAll();

        for (;;) {
          iterations++;
          if (resumeScanAtSamePosition) {
            // only regexes not matched previously will now be
            // considered for a potential match
            resumeScanAtSamePosition = false;
          } else {
            top.matcher.considerAll();
          }
          top.matcher.lastIndex = index;

          const match = top.matcher.exec(codeToHighlight);
          // console.log("match", match[0], match.rule && match.rule.begin)

          if (!match) break;

          const beforeMatch = codeToHighlight.substring(index, match.index);
          const processedCount = processLexeme(beforeMatch, match);
          index = match.index + processedCount;
        }
        processLexeme(codeToHighlight.substring(index));
      } else {
        language.__emitTokens(codeToHighlight, emitter);
      }

      emitter.finalize();
      result = emitter.toHTML();

      return {
        language: languageName,
        value: result,
        relevance,
        illegal: false,
        _emitter: emitter,
        _top: top
      };
    } catch (err) {
      if (err.message && err.message.includes('Illegal')) {
        return {
          language: languageName,
          value: escape(codeToHighlight),
          illegal: true,
          relevance: 0,
          _illegalBy: {
            message: err.message,
            index,
            context: codeToHighlight.slice(index - 100, index + 100),
            mode: err.mode,
            resultSoFar: result
          },
          _emitter: emitter
        };
      } else if (SAFE_MODE) {
        return {
          language: languageName,
          value: escape(codeToHighlight),
          illegal: false,
          relevance: 0,
          errorRaised: err,
          _emitter: emitter,
          _top: top
        };
      } else {
        throw err;
      }
    }
  }

  /**
   * returns a valid highlight result, without actually doing any actual work,
   * auto highlight starts with this and it's possible for small snippets that
   * auto-detection may not find a better match
   * @param {string} code
   * @returns {HighlightResult}
   */
  function justTextHighlightResult(code) {
    const result = {
      value: escape(code),
      illegal: false,
      relevance: 0,
      _top: PLAINTEXT_LANGUAGE,
      _emitter: new options.__emitter(options)
    };
    result._emitter.addText(code);
    return result;
  }

  /**
  Highlighting with language detection. Accepts a string with the code to
  highlight. Returns an object with the following properties:

  - language (detected language)
  - relevance (int)
  - value (an HTML string with highlighting markup)
  - secondBest (object with the same structure for second-best heuristically
    detected language, may be absent)

    @param {string} code
    @param {Array<string>} [languageSubset]
    @returns {AutoHighlightResult}
  */
  function highlightAuto(code, languageSubset) {
    languageSubset = languageSubset || options.languages || Object.keys(languages);
    const plaintext = justTextHighlightResult(code);

    const results = languageSubset.filter(getLanguage).filter(autoDetection).map(name =>
      _highlight(name, code, false)
    );
    results.unshift(plaintext); // plaintext is always an option

    const sorted = results.sort((a, b) => {
      // sort base on relevance
      if (a.relevance !== b.relevance) return b.relevance - a.relevance;

      // always award the tie to the base language
      // ie if C++ and Arduino are tied, it's more likely to be C++
      if (a.language && b.language) {
        if (getLanguage(a.language).supersetOf === b.language) {
          return 1;
        } else if (getLanguage(b.language).supersetOf === a.language) {
          return -1;
        }
      }

      // otherwise say they are equal, which has the effect of sorting on
      // relevance while preserving the original ordering - which is how ties
      // have historically been settled, ie the language that comes first always
      // wins in the case of a tie
      return 0;
    });

    const [best, secondBest] = sorted;

    /** @type {AutoHighlightResult} */
    const result = best;
    result.secondBest = secondBest;

    return result;
  }

  /**
   * Builds new class name for block given the language name
   *
   * @param {HTMLElement} element
   * @param {string} [currentLang]
   * @param {string} [resultLang]
   */
  function updateClassName(element, currentLang, resultLang) {
    const language = (currentLang && aliases[currentLang]) || resultLang;

    element.classList.add("hljs");
    element.classList.add(`language-${language}`);
  }

  /**
   * Applies highlighting to a DOM node containing code.
   *
   * @param {HighlightedHTMLElement} element - the HTML element to highlight
  */
  function highlightElement(element) {
    /** @type HTMLElement */
    let node = null;
    const language = blockLanguage(element);

    if (shouldNotHighlight(language)) return;

    fire("before:highlightElement",
      { el: element, language });

    if (element.dataset.highlighted) {
      console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", element);
      return;
    }

    // we should be all text, no child nodes (unescaped HTML) - this is possibly
    // an HTML injection attack - it's likely too late if this is already in
    // production (the code has likely already done its damage by the time
    // we're seeing it)... but we yell loudly about this so that hopefully it's
    // more likely to be caught in development before making it to production
    if (element.children.length > 0) {
      if (!options.ignoreUnescapedHTML) {
        console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk.");
        console.warn("https://github.com/highlightjs/highlight.js/wiki/security");
        console.warn("The element with unescaped HTML:");
        console.warn(element);
      }
      if (options.throwUnescapedHTML) {
        const err = new HTMLInjectionError(
          "One of your code blocks includes unescaped HTML.",
          element.innerHTML
        );
        throw err;
      }
    }

    node = element;
    const text = node.textContent;
    const result = language ? highlight(text, { language, ignoreIllegals: true }) : highlightAuto(text);

    element.innerHTML = result.value;
    element.dataset.highlighted = "yes";
    updateClassName(element, language, result.language);
    element.result = {
      language: result.language,
      // TODO: remove with version 11.0
      re: result.relevance,
      relevance: result.relevance
    };
    if (result.secondBest) {
      element.secondBest = {
        language: result.secondBest.language,
        relevance: result.secondBest.relevance
      };
    }

    fire("after:highlightElement", { el: element, result, text });
  }

  /**
   * Updates highlight.js global options with the passed options
   *
   * @param {Partial<HLJSOptions>} userOptions
   */
  function configure(userOptions) {
    options = inherit(options, userOptions);
  }

  // TODO: remove v12, deprecated
  const initHighlighting = () => {
    highlightAll();
    deprecated("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
  };

  // TODO: remove v12, deprecated
  function initHighlightingOnLoad() {
    highlightAll();
    deprecated("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
  }

  let wantsHighlight = false;

  /**
   * auto-highlights all pre>code elements on the page
   */
  function highlightAll() {
    function boot() {
      // if a highlight was requested before DOM was loaded, do now
      highlightAll();
    }

    // if we are called too early in the loading process
    if (document.readyState === "loading") {
      // make sure the event listener is only added once
      if (!wantsHighlight) {
        window.addEventListener('DOMContentLoaded', boot, false);
      }
      wantsHighlight = true;
      return;
    }

    const blocks = document.querySelectorAll(options.cssSelector);
    blocks.forEach(highlightElement);
  }

  /**
   * Register a language grammar module
   *
   * @param {string} languageName
   * @param {LanguageFn} languageDefinition
   */
  function registerLanguage(languageName, languageDefinition) {
    let lang = null;
    try {
      lang = languageDefinition(hljs);
    } catch (error$1) {
      error("Language definition for '{}' could not be registered.".replace("{}", languageName));
      // hard or soft error
      if (!SAFE_MODE) { throw error$1; } else { error(error$1); }
      // languages that have serious errors are replaced with essentially a
      // "plaintext" stand-in so that the code blocks will still get normal
      // css classes applied to them - and one bad language won't break the
      // entire highlighter
      lang = PLAINTEXT_LANGUAGE;
    }
    // give it a temporary name if it doesn't have one in the meta-data
    if (!lang.name) lang.name = languageName;
    languages[languageName] = lang;
    lang.rawDefinition = languageDefinition.bind(null, hljs);

    if (lang.aliases) {
      registerAliases(lang.aliases, { languageName });
    }
  }

  /**
   * Remove a language grammar module
   *
   * @param {string} languageName
   */
  function unregisterLanguage(languageName) {
    delete languages[languageName];
    for (const alias of Object.keys(aliases)) {
      if (aliases[alias] === languageName) {
        delete aliases[alias];
      }
    }
  }

  /**
   * @returns {string[]} List of language internal names
   */
  function listLanguages() {
    return Object.keys(languages);
  }

  /**
   * @param {string} name - name of the language to retrieve
   * @returns {Language | undefined}
   */
  function getLanguage(name) {
    name = (name || '').toLowerCase();
    return languages[name] || languages[aliases[name]];
  }

  /**
   *
   * @param {string|string[]} aliasList - single alias or list of aliases
   * @param {{languageName: string}} opts
   */
  function registerAliases(aliasList, { languageName }) {
    if (typeof aliasList === 'string') {
      aliasList = [aliasList];
    }
    aliasList.forEach(alias => { aliases[alias.toLowerCase()] = languageName; });
  }

  /**
   * Determines if a given language has auto-detection enabled
   * @param {string} name - name of the language
   */
  function autoDetection(name) {
    const lang = getLanguage(name);
    return lang && !lang.disableAutodetect;
  }

  /**
   * Upgrades the old highlightBlock plugins to the new
   * highlightElement API
   * @param {HLJSPlugin} plugin
   */
  function upgradePluginAPI(plugin) {
    // TODO: remove with v12
    if (plugin["before:highlightBlock"] && !plugin["before:highlightElement"]) {
      plugin["before:highlightElement"] = (data) => {
        plugin["before:highlightBlock"](
          Object.assign({ block: data.el }, data)
        );
      };
    }
    if (plugin["after:highlightBlock"] && !plugin["after:highlightElement"]) {
      plugin["after:highlightElement"] = (data) => {
        plugin["after:highlightBlock"](
          Object.assign({ block: data.el }, data)
        );
      };
    }
  }

  /**
   * @param {HLJSPlugin} plugin
   */
  function addPlugin(plugin) {
    upgradePluginAPI(plugin);
    plugins.push(plugin);
  }

  /**
   * @param {HLJSPlugin} plugin
   */
  function removePlugin(plugin) {
    const index = plugins.indexOf(plugin);
    if (index !== -1) {
      plugins.splice(index, 1);
    }
  }

  /**
   *
   * @param {PluginEvent} event
   * @param {any} args
   */
  function fire(event, args) {
    const cb = event;
    plugins.forEach(function(plugin) {
      if (plugin[cb]) {
        plugin[cb](args);
      }
    });
  }

  /**
   * DEPRECATED
   * @param {HighlightedHTMLElement} el
   */
  function deprecateHighlightBlock(el) {
    deprecated("10.7.0", "highlightBlock will be removed entirely in v12.0");
    deprecated("10.7.0", "Please use highlightElement now.");

    return highlightElement(el);
  }

  /* Interface definition */
  Object.assign(hljs, {
    highlight,
    highlightAuto,
    highlightAll,
    highlightElement,
    // TODO: Remove with v12 API
    highlightBlock: deprecateHighlightBlock,
    configure,
    initHighlighting,
    initHighlightingOnLoad,
    registerLanguage,
    unregisterLanguage,
    listLanguages,
    getLanguage,
    registerAliases,
    autoDetection,
    inherit,
    addPlugin,
    removePlugin
  });

  hljs.debugMode = function() { SAFE_MODE = false; };
  hljs.safeMode = function() { SAFE_MODE = true; };
  hljs.versionString = version;

  hljs.regex = {
    concat: concat,
    lookahead: lookahead,
    either: either,
    optional: optional,
    anyNumberOfTimes: anyNumberOfTimes
  };

  for (const key in MODES) {
    // @ts-ignore
    if (typeof MODES[key] === "object") {
      // @ts-ignore
      deepFreeze(MODES[key]);
    }
  }

  // merge all the modes/regexes into our main object
  Object.assign(hljs, MODES);

  return hljs;
};

// Other names for the variable may break build script
const highlight = HLJS({});

// returns a new instance of the highlighter to be used for extensions
// check https://github.com/wooorm/lowlight/issues/47
highlight.newInstance = () => HLJS({});

/*! `javascript` grammar compiled for Highlight.js 11.11.1 */
var hljsGrammar=(()=>{const e="[A-Za-z$_][0-9A-Za-z$_]*",n=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],a=["true","false","null","undefined","NaN","Infinity"],t=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],s=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],r=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],c=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],i=[].concat(r,t,s)
;return o=>{const l=o.regex,d=e,b={begin:/<[A-Za-z0-9\\._:-]+/,
end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(e,n)=>{
const a=e[0].length+e.index,t=e.input[a]
;if("<"===t||","===t)return void n.ignoreMatch();let s
;">"===t&&(((e,{after:n})=>{const a="</"+e[0].slice(1)
;return  -1!==e.input.indexOf(a,n)})(e,{after:a})||n.ignoreMatch())
;const r=e.input.substring(a)
;((s=r.match(/^\s*=/))||(s=r.match(/^\s+extends\s+/))&&0===s.index)&&n.ignoreMatch();
}},g={$pattern:e,keyword:n,literal:a,built_in:i,"variable.language":c
},u="[0-9](_?[0-9])*",m=`\\.(${u})`,E="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",A={
className:"number",variants:[{
begin:`(\\b(${E})((${m})|\\.)?|(${m}))[eE][+-]?(${u})\\b`},{
begin:`\\b(${E})\\b((${m})\\b|\\.)?|(${m})\\b`},{
begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{
begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{
begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{
begin:"\\b0[0-7]+n?\\b"}],relevance:0},y={className:"subst",begin:"\\$\\{",
end:"\\}",keywords:g,contains:[]},h={begin:".?html`",end:"",starts:{end:"`",
returnEnd:false,contains:[o.BACKSLASH_ESCAPE,y],subLanguage:"xml"}},_={
begin:".?css`",end:"",starts:{end:"`",returnEnd:false,
contains:[o.BACKSLASH_ESCAPE,y],subLanguage:"css"}},N={begin:".?gql`",end:"",
starts:{end:"`",returnEnd:false,contains:[o.BACKSLASH_ESCAPE,y],
subLanguage:"graphql"}},f={className:"string",begin:"`",end:"`",
contains:[o.BACKSLASH_ESCAPE,y]},p={className:"comment",
variants:[o.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{
begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",
begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:true,
excludeBegin:true,relevance:0},{className:"variable",begin:d+"(?=\\s*(-)|$)",
endsParent:true,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]
}),o.C_BLOCK_COMMENT_MODE,o.C_LINE_COMMENT_MODE]
},v=[o.APOS_STRING_MODE,o.QUOTE_STRING_MODE,h,_,N,f,{match:/\$\d+/},A]
;y.contains=v.concat({begin:/\{/,end:/\}/,keywords:g,contains:["self"].concat(v)
});const S=[].concat(p,y.contains),w=S.concat([{begin:/(\s*)\(/,end:/\)/,
keywords:g,contains:["self"].concat(S)}]),R={className:"params",begin:/(\s*)\(/,
end:/\)/,excludeBegin:true,excludeEnd:true,keywords:g,contains:w},O={variants:[{
match:[/class/,/\s+/,d,/\s+/,/extends/,/\s+/,l.concat(d,"(",l.concat(/\./,d),")*")],
scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{
match:[/class/,/\s+/,d],scope:{1:"keyword",3:"title.class"}}]},k={relevance:0,
match:l.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),
className:"title.class",keywords:{_:[...t,...s]}},I={variants:[{
match:[/function/,/\s+/,d,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],
className:{1:"keyword",3:"title.function"},label:"func.def",contains:[R],
illegal:/%/},x={
match:l.concat(/\b/,(T=[...r,"super","import"].map((e=>e+"\\s*\\(")),
l.concat("(?!",T.join("|"),")")),d,l.lookahead(/\s*\(/)),
className:"title.function",relevance:0};var T;const C={
begin:l.concat(/\./,l.lookahead(l.concat(d,/(?![0-9A-Za-z$_(])/))),end:d,
excludeBegin:true,keywords:"prototype",className:"property",relevance:0},M={
match:[/get|set/,/\s+/,d,/(?=\()/],className:{1:"keyword",3:"title.function"},
contains:[{begin:/\(\)/},R]
},B="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+o.UNDERSCORE_IDENT_RE+")\\s*=>",$={
match:[/const|var|let/,/\s+/,d,/\s*/,/=\s*/,/(async\s*)?/,l.lookahead(B)],
keywords:"async",className:{1:"keyword",3:"title.function"},contains:[R]}
;return {name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:g,exports:{
PARAMS_CONTAINS:w,CLASS_REFERENCE:k},illegal:/#(?![$_A-z])/,
contains:[o.SHEBANG({label:"shebang",binary:"node",relevance:5}),{
label:"use_strict",className:"meta",relevance:10,
begin:/^\s*['"]use (strict|asm)['"]/
},o.APOS_STRING_MODE,o.QUOTE_STRING_MODE,h,_,N,f,p,{match:/\$\d+/},A,k,{
scope:"attr",match:d+l.lookahead(":"),relevance:0},$,{
begin:"("+o.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",
keywords:"return throw case",relevance:0,contains:[p,o.REGEXP_MODE,{
className:"function",begin:B,returnBegin:true,end:"\\s*=>",contains:[{
className:"params",variants:[{begin:o.UNDERSCORE_IDENT_RE,relevance:0},{
className:null,begin:/\(\s*\)/,skip:true},{begin:/(\s*)\(/,end:/\)/,
excludeBegin:true,excludeEnd:true,keywords:g,contains:w}]}]},{begin:/,/,relevance:0
},{match:/\s+/,relevance:0},{variants:[{begin:"<>",end:"</>"},{
match:/<[A-Za-z0-9\\._:-]+\s*\/>/},{begin:b.begin,
"on:begin":b.isTrulyOpeningTag,end:b.end}],subLanguage:"xml",contains:[{
begin:b.begin,end:b.end,skip:true,contains:["self"]}]}]},I,{
beginKeywords:"while if switch catch for"},{
begin:"\\b(?!function)"+o.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
returnBegin:true,label:"func.def",contains:[R,o.inherit(o.TITLE_MODE,{begin:d,
className:"title.function"})]},{match:/\.\.\./,relevance:0},C,{match:"\\$"+d,
relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},
contains:[R]},x,{relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,
className:"variable.constant"},O,M,{match:/\$[(.]/}]}}})()
;

class UiCodeBlock extends UiComponent {
    constructor({
        label,
        id = null,
        fetchFunction = null,
        code,
        language,
    }) {
        super({label, id, fetchFunction, logObjet: true});

        this.type = "sv-ui__codeBlock";

        /** @type {string} */
        this.language = language;

        highlight.registerLanguage('javascript', hljsGrammar);
        
        /** @type {string} */
        this.code = code;

        this.templatePath = `${getConfig().templateRoot}code/codeBlock.html`;

        this._dependencies.uiRegistry.register(this);
    }

    get code() {
        return this._code;
    }

    set code(string) {
        const code = highlight.highlight(string, {language: this.language}).value;
        this._code = code;
    }

    getRenderProperties() {
        return {
            ...super.getRenderProperties(),
            code: this.code,
            language: this.language,
        }
    }
}

class UiIcon extends UiComponent {
    /**
     *
     * @param {string} iconClass
     * @param {string} label
     * @param {string} id
     * @param {boolean} showLabel
     * @param {boolean} addAriaLabel
     * @param {function | null} fetchFunction
     * @param {Object} dependencies
     */
    constructor({
        iconClass,
        label,
        id,
        showLabel = false,
        addAriaLabel = false,
        fetchFunction = null,
        dependencies = dependencyInjection
                })
    {
        super({label, id, fetchFunction, dependencies});
        this.type = "sv-ui__icon";
        this.iconClass = iconClass;
        this.showLabel = showLabel;
        this.addAriaLabel = addAriaLabel;
        this.templatePath = `${this._dependencies.getConfig().templateRoot}icon/icon.html`;
        this._dependencies.uiRegistry.register(this);
    }

    getRenderProperties() {
        return {
            ...super.getRenderProperties(),
            iconClass: this.iconClass,
            showLabel: this.showLabel,
            addAriaLabel: this.addAriaLabel,
        }
    }
}

/**
 * UI Item/Card component for displaying entity information with flexible fields.
 * Each field can be a string, a UiComponent, or (for actions) an array of UiComponents.
 * Field types can be restricted via the static allowedComponentTypes map.
 */
class UiItem extends UiComponent {
    /**
     * Map of allowed component types per field.
     * If a field is not listed, any UiComponent is allowed.
     * @type {Object<string, Array<Function>>}
     */
    static allowedComponentTypes = {
        loudAction: [UiButton],
        calmActions: [UiButton],
        quietActions: [UiButton],
        // Add more as needed
    };

    /**
     * @typedef {Object} UiItemOptions
     * @property {null|string|UiComponent} [loudIdentifier]
     * @property {null|string|UiComponent} [calmIdentifier]
     * @property {null|string|UiComponent} [loudProperties]
     * @property {null|string|UiComponent} [calmProperties]
     * @property {null|string|UiComponent} [quietProperties]
     * @property {null|string|UiComponent} [bodyContent]
     * @property {null|string|UiButton} [loudAction]
     * @property {null|string|UiButton[]} [calmActions]
     * @property {null|string|UiButton[]} [quietActions]
     * @property {string} [label]
     * @property {string} [id]
     * @property {function|null} [fetchFunction]
     * @property {Object} [dependencies]
     */

    /**
     * Creates a new UiItem instance.
     * @param {UiItemOptions} options - Configuration options for the item.
     */
    constructor({
        loudIdentifier,
        calmIdentifier,
        loudProperties = null,
        calmProperties = null,
        quietProperties = null,
        loudAction = null,
        calmActions = null,
        quietActions = null,
        bodyContent = null,
        label = typeof loudIdentifier === "string" ? loudIdentifier : "",
        id,
        fetchFunction = null,
        dependencies = dependencyInjection,
    }) {
        super({ label, id, fetchFunction, dependencies });
        /** @type {string} */
        this.type = "sv-ui__item";
        /** @type {string} */
        this.templatePath = `${this._dependencies.getConfig().templateRoot}item/item.html`;

        /**
         * Internal map of all fields for rendering and child registration.
         * @type {Object<string, any>}
         * @private
         */
        this._fields = {
            loudIdentifier,
            calmIdentifier,
            loudProperties,
            calmProperties,
            quietProperties,
            loudAction,
            calmActions,
            quietActions,
            bodyContent,
        };

        /**
         * List of permanent child components to be rendered into the template.
         * @type {Array<{target: string, component: UiComponent}>}
         */
        this.permanentChildren = [];

        for (const [fieldName, value] of Object.entries(this._fields)) {
            const allowed = this.constructor.allowedComponentTypes[fieldName];

            if (Array.isArray(value)) {
                value.forEach((item, idx) => {
                    if (item instanceof UiComponent) {
                        if (
                            allowed &&
                            !allowed.some((Type) => item instanceof Type)
                        ) {
                            throw new Error(
                                `Component of type ${item.constructor.name} not allowed in array field "${fieldName}". Allowed: ${allowed
                                    .map((t) => t.name)
                                    .join(", ")}`
                            );
                        }
                        // All array items share the same target (the container div)
                        this.permanentChildren.push({
                            target: fieldName,
                            component: item,
                        });
                    }
                });
            } else if (value instanceof UiComponent) {
                if (
                    allowed &&
                    !allowed.some((Type) => value instanceof Type)
                ) {
                    throw new Error(
                        `Component of type ${value.constructor.name} not allowed in field "${fieldName}". Allowed: ${allowed
                            .map((t) => t.name)
                            .join(", ")}`
                    );
                }
                this.permanentChildren.push({
                    target: fieldName,
                    component: value,
                });
            }
        }
    }

    /**
     * Returns an object containing the component's properties for rendering.
     * For fields that are UiComponents or arrays of UiComponents, returns an empty string
     * so the template placeholder is empty and ready for child mounting.
     * @returns {Object<string, string>}
     */
    getRenderProperties() {
        const props = super.getRenderProperties();
        for (const [fieldName, value] of Object.entries(this._fields)) {
            if (Array.isArray(value)) {
                // If all items are components, set to empty string
                if (value.every((item) => item instanceof UiComponent)) {
                    props[fieldName] = "";
                } else {
                    // Otherwise, join as string (or handle as needed)
                    props[fieldName] = value.join(", ");
                }
            } else {
                props[fieldName] = value instanceof UiComponent ? "" : value;
            }
        }
        return props;
    }
}

export { UiButton, UiCodeBlock, UiIcon, UiItem, UiTextField, getConfig, loadConfig, uiRegistry };
//# sourceMappingURL=index.esm.js.map

"use strict";
var moment = require("moment");
var DateConverter = (function () {
    function DateConverter() {
    }
    DateConverter.prototype.mask = function (value) {
        return moment(value).toDate();
    };
    DateConverter.prototype.unmask = function (value) {
        return moment(value).format(moment.defaultFormatUtc);
    };
    return DateConverter;
}());
function Attribute(config) {
    if (config === void 0) { config = {}; }
    return function (target, propertyName) {
        var converter = function (dataType, value, forSerialisation) {
            if (forSerialisation === void 0) { forSerialisation = false; }
            var attrConverter;
            if (config.converter) {
                attrConverter = config.converter;
            }
            else if (dataType === Date) {
                attrConverter = new DateConverter();
            }
            else if (dataType.mask && dataType.unmask) {
                attrConverter = new dataType();
            }
            if (attrConverter) {
                if (!forSerialisation) {
                    return attrConverter.mask(value);
                }
                else {
                    return attrConverter.unmask(value);
                }
            }
            return value;
        };
        var saveAnnotations = function (hasDirtyAttributes, oldValue, newValue, isNew) {
            var annotations = Reflect.getMetadata('Attribute', target) || {};
            var targetType = Reflect.getMetadata('design:type', target, propertyName);
            hasDirtyAttributes = typeof oldValue === 'undefined' && !isNew ? false : hasDirtyAttributes;
            annotations[propertyName] = {
                hasDirtyAttributes: hasDirtyAttributes,
                oldValue: oldValue,
                newValue: newValue,
                serialisationValue: converter(targetType, newValue, true)
            };
            Reflect.defineMetadata('Attribute', annotations, target);
        };
        var getter = function () {
            return this['_' + propertyName];
        };
        var setter = function (newVal) {
            var targetType = Reflect.getMetadata('design:type', target, propertyName);
            var convertedValue = converter(targetType, newVal);
            if (convertedValue !== this['_' + propertyName]) {
                saveAnnotations(true, this['_' + propertyName], newVal, !this.id);
                this['_' + propertyName] = convertedValue;
            }
        };
        if (delete target[propertyName]) {
            saveAnnotations(false, undefined, target[propertyName], target.id);
            Object.defineProperty(target, propertyName, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }
    };
}
exports.Attribute = Attribute;
//# sourceMappingURL=attribute.decorator.js.map
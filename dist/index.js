"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const converter_1 = require("typedoc/dist/lib/converter");
const comment_1 = require("typedoc/dist/lib/converter/factories/comment");
const abstract_1 = require("typedoc/dist/lib/models/reflections/abstract");
function load({ application }) {
    application.converter.on(converter_1.Converter.EVENT_CREATE_DECLARATION, (context, reflection, node) => {
        reflection.kind = reflection.kind === abstract_1.ReflectionKind.Module ? abstract_1.ReflectionKind.ExternalModule : reflection.kind;
        if (!node) {
            return;
        }
        const rawComment = comment_1.getRawComment(node);
        if (!rawComment) {
            return;
        }
        reflection.comment = !reflection.comment ? comment_1.parseComment(rawComment) : reflection.comment;
    });
}
exports.load = load;

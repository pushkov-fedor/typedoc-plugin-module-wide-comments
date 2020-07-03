import {PluginHost} from 'typedoc/dist/lib/utils'
import { Converter, Context } from 'typedoc/dist/lib/converter'
import { getRawComment, parseComment } from "typedoc/dist/lib/converter/factories/comment"
import { ReflectionKind } from 'typedoc/dist/lib/models/reflections/abstract'
import { DeclarationReflection } from 'typedoc'

export function load({application}: PluginHost) {
  application.converter.on(Converter.EVENT_CREATE_DECLARATION, (context: Context, reflection: DeclarationReflection, node) => {
    reflection.kind = reflection.kind === ReflectionKind.Module ? ReflectionKind.ExternalModule : reflection.kind
    if (!node) {
      return
    }
    const rawComment = getRawComment(node)
    if (!rawComment) {
      return
    }
    reflection.comment = !reflection.comment ? parseComment(rawComment) : reflection.comment
  })
}
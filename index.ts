import {PluginHost} from 'typedoc/dist/lib/utils'
import { Converter, Context } from 'typedoc/dist/lib/converter'
import { getRawComment, parseComment } from "typedoc/dist/lib/converter/factories/comment"
import { ReflectionKind } from 'typedoc/dist/lib/models/reflections/abstract'
import { DeclarationReflection } from 'typedoc'

export function load({application}: PluginHost) {
  /** Subscribe on EVENT_CREATE_DECLARATIN. */
  application.converter.on(Converter.EVENT_CREATE_DECLARATION, (context: Context, reflection: DeclarationReflection, node) => {
    /** Re-define all Modules as External. */
    reflection.kind = reflection.kind === ReflectionKind.Module ? ReflectionKind.ExternalModule : reflection.kind
    if (!node) {
      return
    }
    /** Get comment from current node, which declaration is being created. */
    const rawComment = getRawComment(node)
    if (!rawComment) {
      return
    }
    /** If comment was added (e.g. for function, constants etc) - do nothing, otherwise (for modules without @packageDocumentation tag, which comment property is empty) add parsed comment. */
    reflection.comment = !reflection.comment ? parseComment(rawComment) : reflection.comment
  })
}
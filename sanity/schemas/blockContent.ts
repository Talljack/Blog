import { defineArrayMember, defineType } from 'sanity'

import { Tweet } from '~/sanity/components/Tweet'

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
        {
          name: 'label',
          type: 'string',
          title: 'Label',
        },
      ],
    }),
    defineArrayMember({
      type: 'code',
      name: 'codeBlock',
      title: 'Code Block',
      options: {
        withFilename: true,
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'tweet',
      title: 'Tweet',
      fields: [
        {
          name: 'id',
          type: 'string',
          title: 'Tweet ID',
        },
      ],
      components: {
        preview: Tweet as any,
      },
      preview: {
        select: {
          id: 'id',
        },
      },
    }),
    defineArrayMember({
      type: 'block',
    }),
  ],
})

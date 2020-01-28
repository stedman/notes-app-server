/* eslint-disable no-unused-vars */
const {
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLID,
} = require('graphql');
const { noteType } = require('../nodeTypes');
const NoteService = require('../../services/NoteService');

const CreateNoteMutation = {
  type: noteType,
  args: {
    content: { type: GraphQLString },
  },
  resolve: async (_, { content }) => {
    const noteService = new NoteService();
    const newNote = await noteService.createNote({ content });

    return newNote;
  },
};

const UpdateNoteMutation = {
  type: noteType,
  args: {
    _id: { type: GraphQLID },
    content: { type: GraphQLString },
  },
  resolve: async (_, { _id, content }) => {
    const noteService = new NoteService();
    const updatedNote = await noteService.updateNote(_id, { content });

    return updatedNote;
  },
};

const DeleteNoteMutation = {
  type: GraphQLID,
  args: {
    _id: { type: GraphQLID },
  },
  resolve: async (_, { _id }) => {
    const noteService = new NoteService();
    const res = await noteService.deleteNote(_id);

    if (res.ok) {
      return _id;
    }
  },
};

module.exports = { CreateNoteMutation, UpdateNoteMutation, DeleteNoteMutation };

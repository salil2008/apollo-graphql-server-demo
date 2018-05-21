import casual from 'casual';

const mocks = {
  Query: () => ({
  	author: (root, args) => {
  		return { firstName: args.firstName, lastName: args.lastName };
  	},
  }),
  allAuthors: () => ({ firstName: () => casual.first_name, lastName: () => casual.last_name }),
  Post: () => ({ title: casual.title, text: casual.sentences(3) }),
};

export default mocks;

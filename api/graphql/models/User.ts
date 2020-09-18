import { schema } from 'nexus';

export const User = schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.first_name();
    t.model.last_name();
    t.model.email();
    t.model.posts({ pagination: false });
    t.model.type();
  },
});

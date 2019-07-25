const userRoutes = require('./user.routes')
const questionRoutes = require('./question.routes')

module.exports = (app)=>{
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/questions', questionRoutes);
};

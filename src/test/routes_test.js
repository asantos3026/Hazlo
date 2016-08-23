import chai, { expect } from 'chai'
import spies from 'chai-spies'
import routes from '../routes'

chai.use(spies)

describe('routes', ()=>{
  describe('GET /', ()=>{
    describe('when logged in', ()=>{
      it('should render the index view with the current users name', (done) =>{
        const req = {
          cookies: [],
          session: {userId: 42},
        }
        const res = {
          render: chai.spy()
        }
        routes.get.index(req, res)
        expect(res.render).to.have.been.called.with('index', {
          session: req.session,
          currentUser: {name: 'Jared Grippe'}
        });
        done();
      })
    })

    describe('when not logged in', ()=>{
      it('should render the index view with the current users name', (done) =>{
        const req = {
          cookies: [],
          session: {},
        }
        const res = {
          render: chai.spy()
        }
        routes.get.index(req, res)
        expect(res.render).to.have.been.called.with('index', {
          session: req.session,
          currentUser: null
        });
        done();
      })
    })
	})
})
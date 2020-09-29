import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

const OK = 200;
const CREATED = 201;
const NOT_FOUND = 404;
const ITERNAL_SERVER_ERROR = 500;

chai.should();

chai.use(chaiHttp);

describe('Appliances API', () => {
  describe('GET /appliances', () => {
    it('It should GET all the appliances', (done) => {
      chai.request(server)
        .get('/appliances')
        .end((err, res) => {
          res.should.have.status(OK);
          res.body.should.be.a('array');

          done();
        });
    });

    it('It should NOT GET all the appliances', (done) => {
      chai.request(server)
        .get('/appliance')
        .end((err, res) => {
          res.should.have.status(NOT_FOUND);

          done();
        });
    });
  });

  describe('GET /appliances/:id', () => {
    it('It should GET a appliance by ID', (done) => {
      const appliancesID = '5f71b310041b7b7a542154ec';
      chai.request(server)
        .get(`/appliances/${appliancesID}`)
        .end((err, res) => {
          res.should.have.status(OK);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('title');
          res.body.should.have.property('description');
          res.body.should.have.property('category');
          res.body.should.have.property('vendorCode');

          done();
        });
    });

    it('It should NOT GET a appliance by ID', (done) => {
      const appliancesID = 1234;
      chai.request(server)
        .get(`/appliances/${appliancesID}`)
        .end((err, res) => {
          res.should.have.status(ITERNAL_SERVER_ERROR);

          done();
        });
    });
  });

  describe('POST /appliances', () => {
    it('It should POST a new appliance', (done) => {
      const appliance = {
        title: 'PerfectCare 800',
        description: 'Стиральные машины серии PerfectCare 800 оборудованы системой UltraCare',
        category: 'Стиральные машины',
        vendorCode: 'EW8F3R28S'
      };

      chai.request(server)
        .post('/appliances/add')
        .send(appliance)
        .end((err, res) => {
          res.should.have.status(CREATED);
          res.body.should.be.a('object');
          res.body.appliance.should.have.property('title').eq('PerfectCare 800');
          res.body.appliance.should.have.property('description')
            .eq('Стиральные машины серии PerfectCare 800 оборудованы системой UltraCare');
          res.body.appliance.should.have.property('category').eq('Стиральные машины');
          res.body.appliance.should.have.property('vendorCode').eq('EW8F3R28S');

          done();
        });
    });

    it('It should NOT POST a new appliance without title property', (done) => {
      const appliance = {
        description: 'Стиральные машины серии PerfectCare 800 оборудованы системой UltraCare',
        category: 'Стиральные машины',
        vendorCode: 'EW8F3R28S'
      };

      chai.request(server)
        .post('/appliances/add')
        .send(appliance)
        .end((err, res) => {
          res.should.have.status(ITERNAL_SERVER_ERROR);

          done();
        });
    });
  });

  describe('POST /appliances/update/:id', () => {
    const appliance = {
      title: 'Electrolux Intuit 900',
      description: 'Встраиваемая кофемашина Electrolux Intuit 900 KBC65X имеет сенсорную панель управления',
      category: 'Кофемашина',
      vendorCode: 'KBC65X'
    };

    it('It should UPDATE an appliance by ID', (done) => {
      const appliancesID = '5f71b310041b7b7a542154ec';

      chai.request(server)
        .post(`/appliances/update/${appliancesID}`)
        .send(appliance)
        .end((err, res) => {
          res.should.have.status(OK);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Appliance updated!');

          done();
        });
    });

    it('It should NOT UPDATE an appliance by ID', (done) => {
      const appliancesID = 1234;

      chai.request(server)
        .post(`/appliances/update/${appliancesID}`)
        .send(appliance)
        .end((err, res) => {
          res.should.have.status(ITERNAL_SERVER_ERROR);

          done();
        });
    });
  });

  describe('DELETE /appliances/:id', () => {
    it('It should DELETE an exesting appliance', (done) => {
      const appliancesID = '5f7125c2d69132258556ec6a';
      chai.request(server)
        .delete(`/appliances/${appliancesID}`)
        .end((err, res) => {
          res.should.have.status(OK);
          res.body.should.have.property('message').eql('Appliance deleted');

          done();
        });
    });

    it('It should NOT DELETE an exesting appliance', (done) => {
      const appliancesID = 1234;
      chai.request(server)
        .delete(`/appliances/${appliancesID}`)
        .end((err, res) => {
          res.should.have.status(ITERNAL_SERVER_ERROR);

          done();
        });
    });
  });
});

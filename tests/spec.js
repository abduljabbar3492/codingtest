import app from '../server.js';


describe('cities suggestions should be in given radius', () => {
    it('tests /suggestions endpoints', async () => {
        const response = await app.get('/suggestions');
        expect(response.body).toHaveProperty('data')
    });
});
import express,{Application} from 'express'
//import morgan from "morgan";
import RouteCar from './RouteCar';
//import EmpresaRoute from './EmpresaRoute'

export class Server{
    private  port: number=3004;
    private app:Application;
    constructor() {
        this.app = express();
        this.middleware();
        this.routes();
    }

    private middleware() {
        //this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    private routes() {
        this.app.use('/api/car', RouteCar)
        //this.app.use('/api/empresa', EmpresaRoute)
    }

    async start(){
        await this.app.listen(this.port);
        console.log('Server on port ',this.port);
    }
}
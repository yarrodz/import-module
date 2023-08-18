import ApiConnection from '../../api/interfaces/api-connection.interface';
import SqlConnection from '../../sql/interfaces/sql.connection.interface';
export default interface ImportReference {
    inUnit?: any;
    hasConnection?: SqlConnection | ApiConnection;
}

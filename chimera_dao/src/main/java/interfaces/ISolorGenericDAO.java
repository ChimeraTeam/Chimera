package interfaces;

import java.io.Serializable;
import java.util.List;

/**
 * Created by gleb on 03.11.2014.
 */
public interface ISolorGenericDAO<T, ID extends Serializable> {

    public T getByID(ID id);

    public List<T> getListAll();

    public ID save(T entity);

    public boolean delete(T entity);

    public boolean delete(ID entityId);

    public boolean rollback();

    public boolean commit();
}

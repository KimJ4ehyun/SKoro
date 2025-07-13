package skala.skoro.domain.auth.repository;

import org.springframework.data.repository.CrudRepository;
import skala.skoro.domain.auth.entity.RefreshTokenEntry;

public interface RefreshTokenRepository extends CrudRepository<RefreshTokenEntry, String> {
}

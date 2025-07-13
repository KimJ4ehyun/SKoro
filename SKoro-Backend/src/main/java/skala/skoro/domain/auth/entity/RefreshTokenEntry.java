package skala.skoro.domain.auth.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@RedisHash(value = "refresh_token", timeToLive = 1209600)
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RefreshTokenEntry implements Serializable {

    @Id
    private String empNo;
    private String token;

}

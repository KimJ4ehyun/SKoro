package skala.skoro.global.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.List;

@Configuration
public class SwaggerConfig {

    @Value("${spring.application.name}")
    String applicationName;

    @Bean
    public OpenAPI springShopOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title(applicationName + " API 명세서")
                        .version("1.0")
                        .description("""
                        이 문서는 SKoro 시스템의 REST API 명세서입니다.
                              
                        context-path: /api`로 시작하는 모든 엔드포인트가 대상입니다.
                        Servers에서 원하는 URL로 요청을 보낼 수 있고, 추가 필요 시 문의바랍니다.
                            
                        <사용 방법>
                        1. 먼저 로그인을 한 후에 Response로 받은 accessToken을 복사
                        2. 우측 상단의 Authorize 버튼을 통해 토큰을 입력해 주세요.
                        3. 역할은 총 3가지 ADMIN(관리자), MANAGER(팀장), MEMBER(팀원)입니다.
                        - [팀장]이면 팀장 이상의 권한을 가진 사원이 사용 가능
                        - 아무 표시가 없으면 어떤 권한이라도 사용 가능
                        """)
                        .license(new License()
                                .name(applicationName)
                                .url("http://localhost:8080/api")
                        )
                )
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                .components(new Components()
                        .addSecuritySchemes("bearerAuth", new SecurityScheme()
                                .name("Authorization")
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                        )
                )
                .servers(List.of(
                        new Server()
                                .url("https://skoro.skala25a.project.skala-ai.com/api")
                                .description("Production Server"),
                        new Server()
                                .url("http://localhost:8080/api")
                                .description("Local Development server")
                ));
    }
}

package com.iforddow.league_management.repository;

import com.iforddow.league_management.jpa.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/*
* TokenRepository interface extends JpaRepository interface
*
* @Author: IFD
* @Since: 2025-02-04
* */
@Repository
public interface TokenRepository extends JpaRepository<Token, Integer> {

    /*
    * A query to find all valid tokens by user
    *
    * @param id
    * @return List<Token>
    *
    * @Author: IFD
    * @Since: 2025-02-04
    * */
    @Query("SELECT t FROM Token t inner join User u on t.user.id = u.id WHERE u.id = :id" +
            " AND (t.revoked = false AND t.expired = false)")
    List<Token> findAllValidTokenByUser(Long id);

    /*
    * A query to find a token by token
    *
    * @param token
    * @return Optional<Token>
    *
    * @Author: IFD
    * @Since: 2025-02-04
    * */
    Optional<Token> findByToken(String token);

    /*
    * A query to delete all expired and revoked tokens
    *
    * @return int
    *
    * @Author: IFD
    * @Since: 2025-02-09
    * */
    @Modifying
    @Query("DELETE FROM Token t WHERE t.expired = true OR t.revoked = true")
    int deleteAllExpiredAndRevokedTokens();

    /*
    * A query to revoke all tokens by user
    *
    * @param userId
    * @return int
    *
    * @Author: IFD
    * @Since: 2025-02-09
    * */
    @Modifying
    @Query("UPDATE Token t SET t.expired = true, t.revoked = true WHERE t.user.id = :userId AND t.expired = false AND t.revoked = false")
    int revokeTokensByUser(@Param("userId") Integer userId);  // Returns the number of tokens updated

}

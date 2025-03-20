package com.iforddow.league_management.auditing;

import com.iforddow.league_management.jpa.entity.User;
import lombok.NonNull;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

/*
* A class that implements the AuditorAware interface to provide the current user id
* for auditing purposes. This class is used by the JPA Auditing feature to set the
* createdBy and lastModifiedBy fields of the entities.
*
* @Author: IFD
* @Since: 2025-02-07
* */
public class ApplicationAuditAware implements AuditorAware<Integer> {

    /*
    * A method that returns the current user id if the user is authenticated.
    * If the user is not authenticated, it returns an empty Optional.
    *
    * @return Optional<Long> - the current user id if the user is authenticated, otherwise an empty Optional
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @Override
    @NonNull
    public Optional<Integer> getCurrentAuditor() {
        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();
        if (authentication == null ||
                !authentication.isAuthenticated() ||
                authentication instanceof AnonymousAuthenticationToken
        ) {
            return Optional.empty();
        }

        User userPrincipal = (User) authentication.getPrincipal();
        return Optional.ofNullable(userPrincipal.getId());
    }
}
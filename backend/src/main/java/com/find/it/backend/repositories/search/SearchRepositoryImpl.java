package com.find.it.backend.repositories.search;

import java.util.LinkedList;
import java.util.UUID;

import org.hibernate.search.engine.search.query.SearchResult;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.find.it.backend.models.Item;
import com.find.it.backend.models.ItemType;

import org.apache.commons.lang3.StringUtils;
import jakarta.persistence.EntityManager;

@Transactional
public class SearchRepositoryImpl extends SimpleJpaRepository<Item, Long> implements SearchRepository {
  private final EntityManager entityManager;

  public SearchRepositoryImpl(Class<Item> domainClass, EntityManager entityManager) {
    super(domainClass, entityManager);
    this.entityManager = entityManager;
  }

  public SearchRepositoryImpl(JpaEntityInformation<Item, Long> entityInformation, EntityManager entityManager) {
    super(entityInformation, entityManager);
    this.entityManager = entityManager;
  }

  @Override
  public Page<Item> search(
      String query,
      String city,
      String state,
      boolean finds,
      boolean losts,
      boolean donateds,
      Pageable page) {
    LinkedList<ItemType> types = new LinkedList<ItemType>();
    if (finds)
      types.add(ItemType.FIND);
    if (losts)
      types.add(ItemType.LOST);
    if (donateds)
      types.add(ItemType.DONATION);

    int offset = page.getPageNumber() * page.getPageSize();
    SearchSession searchSession = Search.session(entityManager);
    SearchResult<Item> result = searchSession
        .search(getDomainClass())
        .where(f -> f.bool()
            .must(f.bool().should(f.simpleQueryString().field("title").matching("*" + query + "*"))
                .should(f.wildcard().field("title").matching("*" + query + "*"))
                .should(f.match().field("title").matching(query).fuzzy(2)))
            .must(f.match().field("city").matching(city))
            .must(f.match().field("state").matching(state))
            .must(f.terms().field("type").matchingAny(types)))
        .sort(s -> s.field("updated_at").desc())
        .fetch(offset, offset + page.getPageSize());

    return new PageImpl<Item>(result.hits(), page, result.total().hitCount());
  }

  @Override
  public Page<Item> search(
      String query,
      boolean finds,
      boolean losts,
      boolean donateds,
      UUID user,
      Pageable page) {
    LinkedList<ItemType> types = new LinkedList<ItemType>();
    if (finds)
      types.add(ItemType.FIND);
    if (losts)
      types.add(ItemType.LOST);
    if (donateds)
      types.add(ItemType.DONATION);

    int offset = page.getPageNumber() * page.getPageSize();

    SearchSession searchSession = Search.session(entityManager);
    SearchResult<Item> result = searchSession
        .search(getDomainClass())
        .where(f -> f.bool()
            .must(f.bool().should(f.simpleQueryString().field("title").matching("*" + query + "*"))
                .should(f.wildcard().field("title").matching("*" + query + "*"))
                .should(f.match().field("title").matching(query).fuzzy(2)))
            .must(f.match().field("user.id").matching(user))
            .must(f.terms().field("type").matchingAny(types)))
        .sort(s -> s.field("updated_at").desc())
        .fetch(offset, offset + page.getPageSize());

    return new PageImpl<Item>(result.hits(), page, result.total().hitCount());
  }
}

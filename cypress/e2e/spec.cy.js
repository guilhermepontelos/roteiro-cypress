describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Edita uma tarefa existente', () => {
  cy.visit('');

  // Adiciona uma tarefa para ser editada
  const originalTask = 'Tarefa a ser modificada';
  const editedTask = 'Tarefa modificada';
  cy.get('[data-cy=todo-input]')
    .type(`${originalTask}{enter}`);

  cy.get('[data-cy=todos-list]')
    .children()
    .should('have.length', 1)
    .first()
    .should('have.text', originalTask);

  // Duplo clique para entrar no modo de edição e edita a tarefa
  cy.get('[data-cy=todos-list] li label')
    .dblclick();

  cy.get('[data-cy=todos-list] li .edit')
    .clear()
    .type(`${editedTask}{enter}`);

  // (A verificação do texto final será feita no próximo teste para focar na ação aqui)
  // No entanto, podemos verificar que o campo de edição não está mais visível.
  cy.get('[data-cy=todos-list] li .edit')
    .should('not.exist');
});

it('Verifica a edição de uma tarefa', () => {
  cy.visit('');

  // Adiciona e edita uma tarefa dentro deste teste para garantir a independência
  const originalTask = 'Item inicial';
  const newText = 'Item atualizado';
  cy.get('[data-cy=todo-input]')
    .type(`${originalTask}{enter}`);

  cy.get('[data-cy=todos-list] li label')
    .dblclick();

  cy.get('[data-cy=todos-list] li .edit')
    .clear()
    .type(`${newText}{enter}`);

  // Verifica se a tarefa foi editada corretamente
  cy.get('[data-cy=todos-list]')
    .children()
    .should('have.length', 1)
    .first()
    .should('have.text', newText);
});

it('Limpa tarefas completadas', () => {
  cy.visit('');

  // Adiciona algumas tarefas
  cy.get('[data-cy=todo-input]')
    .type('Tarefa A{enter}')
    .type('Tarefa B{enter}')
    .type('Tarefa C{enter}');

  cy.get('[data-cy=todos-list]')
    .children()
    .should('have.length', 3);

  // Marca a "Tarefa A" e "Tarefa C" como completas
  cy.get('[data-cy=todos-list] li')
    .contains('Tarefa A')
    .parent()
    .find('[data-cy=toggle-todo-checkbox]')
    .click();

  cy.get('[data-cy=todos-list] li')
    .contains('Tarefa C')
    .parent()
    .find('[data-cy=toggle-todo-checkbox]')
    .click();

  // Verifica se 2 tarefas estão completas
  cy.get('[data-cy=todos-list] li.completed')
    .should('have.length', 2);

  // Clica no botão 'Clear completed'
  cy.get('.clear-completed')
    .should('be.visible')
    .click();

  // Verifica se apenas as tarefas não completadas (Tarefa B) restaram
  cy.get('[data-cy=todos-list]')
    .children()
    .should('have.length', 1)
    .first()
    .should('have.text', 'Tarefa B');
});

});


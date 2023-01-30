describe("PPTHub 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      { method: "POST", url: "http://localhost:8000/ppts/save" },
      { fixture: "pptIDMockData.json" },
    ).as("pptsSave");
    cy.intercept(
      { method: "POST", url: "http://localhost:8000/ppts/compare" },
      { fixture: "diffMockData.json" },
    ).as("pptsCompare");
    cy.intercept(
      { method: "POST", url: "http://localhost:8000/ppts/merge" },
      { fixture: "pptIDMockData.json" },
    ).as("pptsMerge");
    cy.intercept(
      {
        method: "GET",
        url: "http://localhost:8000/:ppt_id/download?*",
      },
      { fixture: "mergedPptMockData.json" },
    ).as("pptDownload");
    cy.visit("/");
    cy.viewport(1536, 960);
  });

  it("처음 사이트에 접속할 시 타이틀과 샘플 파일 첨부가 보임", () => {
    cy.title().should("include", "PPTHub");
    cy.findByText("샘플 파일 첨부").should("exist");
  });

  it("두개의 ppt파일을 업로드하면 화면에 렌더링되고 비교하기 버튼이 나타남", () => {
    cy.get("input[type=file]").selectFile(
      {
        contents: "cypress/fixtures/comparablePpt.pptx",
      },
      { force: true },
    );
    cy.wait("@pptsSave");
    cy.findByText("되돌리기").should("exist");
    cy.get("input[type=file]").selectFile(
      {
        contents: "cypress/fixtures/originalPpt.pptx",
      },
      { force: true },
    );
    cy.wait("@pptsSave");
    cy.findByText("비교하기").should("exist");
  });

  it("비교하기 버튼을 누르면 비교를 하여 결과를 보여줌", () => {
    cy.get("input[type=file]").selectFile(
      {
        contents: "cypress/fixtures/comparablePpt.pptx",
      },
      { force: true },
    );
    cy.wait("@pptsSave");
    cy.get("input[type=file]").selectFile(
      {
        contents: "cypress/fixtures/originalPpt.pptx",
      },
      { force: true },
    );
    cy.wait("@pptsSave");
    cy.findByText("비교하기").click();
    cy.wait("@pptsCompare");
    cy.findByText("합치기").should("exist");
  });

  it("비교 결과 합치기 버튼을 누르고 성공하면 다운로드 페이지로 이동 버튼이 나타남", () => {
    cy.get("input[type=file]").selectFile(
      {
        contents: "cypress/fixtures/comparablePpt.pptx",
      },
      { force: true },
    );
    cy.wait("@pptsSave");
    cy.get("input[type=file]").selectFile(
      {
        contents: "cypress/fixtures/originalPpt.pptx",
      },
      { force: true },
    );
    cy.wait("@pptsSave");
    cy.findByText("비교하기").click();
    cy.wait("@pptsCompare");
    cy.findByText("합치기").click();
    cy.wait("@pptsMerge");
    cy.findByText("다운로드 페이지로").should("exist");
  });

  it("다운로드페이지로 버튼을 눌러 다운로드 페이지로 이동하면 미리보기와 함께 다운로드 버튼이 나타남.", () => {
    cy.get("input[type=file]").selectFile(
      {
        contents: "cypress/fixtures/comparablePpt.pptx",
      },
      { force: true },
    );
    cy.wait("@pptsSave");
    cy.get("input[type=file]").selectFile(
      {
        contents: "cypress/fixtures/originalPpt.pptx",
      },
      { force: true },
    );
    cy.wait("@pptsSave");
    cy.findByText("비교하기").click();
    cy.wait("@pptsCompare");
    cy.findByText("합치기").click();
    cy.wait("@pptsMerge");
    cy.findByText("다운로드 페이지로").click();
    cy.wait("@pptDownload");
    cy.findByText("다운로드").should("exist");
  });

  it("링크를 통해 다운로드페이지로 접속하면 미리보기와 함께 다운로드 버튼이 나타남.", () => {
    cy.visit("/1234/download");
    cy.wait("@pptDownload");
    cy.findByText("다운로드").should("exist");
  });

  it("존재하지 않은 URL을 입력하면 404페이지로 이동함", () => {
    cy.visit("/123456");
    cy.findByText("찾으시려는 페이지가 현재 존재하지 않습니다.").should(
      "exist",
    );
    cy.findByText("Home").should("exist");
  });
});

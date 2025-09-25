import re
from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navega para a página de dashboard
        # A aplicação deve redirecionar para /login, mas vamos direto para /dashboard
        # já que a rota ainda não está protegida.
        page.goto("http://localhost:3000/dashboard")

        # Espera o título principal da página do dashboard aparecer
        expect(page.get_by_role("heading", name="Bem-vindo(a) ao seu Dashboard")).to_be_visible(timeout=10000)

        # Verifica se o título da aba do navegador está correto
        expect(page).to_have_title(re.compile("ERP System"))

        # Verifica se um dos cards de KPI está visível
        expect(page.get_by_text("Vendas do Mês")).to_be_visible()

        # Verifica se o Sidebar está visível
        expect(page.get_by_text("Perfis de Acesso")).to_be_visible()

        # Tira a captura de tela
        screenshot_path = "jules-scratch/verification/dashboard_view.png"
        page.screenshot(path=screenshot_path, full_page=True)
        print(f"Screenshot saved to {screenshot_path}")

    except Exception as e:
        print(f"An error occurred: {e}")
        # Tira uma captura de tela em caso de erro para depuração
        page.screenshot(path="jules-scratch/verification/error.png")
    finally:
        context.close()
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
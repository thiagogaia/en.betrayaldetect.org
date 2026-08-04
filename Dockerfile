FROM nginx:alpine

# Remove a configuração padrão do NGINX
RUN rm -rf /usr/share/nginx/html/*

# Copie os arquivos do site para o diretório do NGINX
COPY ./site /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Inicia o NGINX quando o container for executado
CMD ["nginx", "-g", "daemon off;"]
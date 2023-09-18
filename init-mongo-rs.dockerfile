FROM mongo:7.0

COPY init-entrypoint.sh /init-entrypoint.sh
RUN chmod +x /init-entrypoint.sh

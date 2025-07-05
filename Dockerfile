FROM "go" as build1
FROM "node" as build2

FROM build2

RUN cd client && \
    npm i && \
    npm run build

FROM build1 

RUN go build main.go 

FROM build1

COPY --from=build2 /client

CMD ./main
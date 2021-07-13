# 3MDash-Frontend

Bienvenido al Frontend del trablero de control. El artefacto de software fue construido usando las siguientes tecnologias.

> Angular **[Documentation](https://angular.io/docs)**.

> Nebular Components **[Documentation](https://akveo.github.io/nebular/docs/getting-started/what-is-nebular#what-is-nebular)**.

> Ngx-Admin theme **[Demo](https://www.akveo.com/ngx-admin/themes)**.

> Apache e-charts **[Documentation](https://echarts.apache.org/examples/en/index.html)**.

> Eva-icons **[Documentation](https://akveo.github.io/eva-icons/#/?searchKey=activ&type=outline)**.

Los componentes realizados se basan en las tecnologias previamente citadas, donde se encuentran dos tipos de componentes gráficos genericos.

* measure-line-graph
* comparative-measure-line-graph

Y un componente grafico generico para las matrices llamado **measure-matrix**

Estos componentes como toda la aplicación recibe parametros que se ajustan a la naturaleza de la medida. Para más información dirigirse a *3MDash-Frontend/frontend/src/app/components/*

Los parametros importantes de la aplicación se encuentran ubicados en *3MDash-Frontend/frontend/src/app/utils/* donde se podrá especificar los endpoint de la API REST la cual presta los servicios que permiten consultar los datos de consumo.

El diseño de la aplicación se adapta a los parametros de la libreria Nebular, por lo tanto si se quiere modificar el tema se debería consultar la documentación previamente citada.

"use client";

import { useFetch } from "@/utils/hooks/useFetch";
import { useState } from "react";
import { queryBuilder } from "@/utils/functions/query-builder";
import { Situacao } from "@/interface/ISituacao";
import { Filter } from "@/interface/IQuery";
import { TableDefault } from "@/components/table/TableDefault";
import { IRelatorioPia } from "./Interface/IRelatorioPia";
import { Input, Select } from "antd";
import { CriarUsuarioModal } from "../usuario/components/CriarUsuarioModal";
import { SearchOutlined } from "@ant-design/icons";

export default function RelatorioPia() {
  const [pageLimit, setPageLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pesquisa, setPesquisa] = useState<string>("");
  const [situacao, setSituacao] = useState<Situacao>(Situacao.ATIVO);

  let filtros: Filter | undefined = new Array();

  if (pesquisa !== "")
    filtros.push({
      path: "nome",
      operator: "contains",
      value: pesquisa,
      insensitive: true,
    });

  if (situacao)
    filtros.push({
      path: "situacao",
      operator: "equals",
      value: situacao,
    });

  const { data, totalCount, refetch } = useFetch<IRelatorioPia[]>(
    "/relatorio-pia",
    [pesquisa, situacao, pageLimit, currentPage],
    {
      params: queryBuilder({
        page_limit: pageLimit,
        page_number: currentPage,
        filter: filtros,
        sort: [{ field: "criado_em", criteria: "desc" }],
      }),
    }
  );

  const columns: ColumnsType<IRelatorioPia> = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
  ];

  return (
    <div className="flex flex-col gap-[15px] mt-8">
      <div className="flex gap-5">
        <CriarUsuarioModal refetchList={refetch} />
        <Input
          placeholder="Buscar"
          size="large"
          onChange={(e) => setPesquisa(e.target.value)}
          suffix={<SearchOutlined className="cursor-pointer opacity-50" />}
        />
        <Select
          className="w-[105px]"
          size="large"
          onChange={(e) => setSituacao(e as Situacao)}
          defaultValue="ATIVO"
          options={[
            { value: "ATIVO", label: "Ativos" },
            { value: "INATIVO", label: "Inativos" },
            { value: "", label: "Todos" },
          ]}
        />
      </div>
      <TableDefault
        dataSource={data}
        columns={columns}
        pagination
        totalCount={totalCount}
        setPageLimit={setPageLimit}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
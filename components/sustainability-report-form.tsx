import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "../hooks/use-toast.ts";
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;


// Definindo o esquema de validação para o formulário
const formSchema = z.object({
  companyName: z.string().min(2, { message: "O nome da empresa deve ter pelo menos 2 caracteres." }),
  companyOverview: z.string().min(10, { message: "Por favor, forneça uma visão geral da empresa com pelo menos 10 caracteres." }),
  carbonEmissions: z.string().min(1, { message: "Por favor, insira as emissões de carbono." }),
  waterConsumption: z.string().min(1, { message: "Por favor, insira o consumo de água." }),
  wasteTypes: z.string().min(1, { message: "Por favor, liste os tipos de resíduos gerados." }),
  wasteAmount: z.string().min(1, { message: "Por favor, insira a quantidade de resíduos gerados." }),
  wasteDisposal: z.string().min(1, { message: "Por favor, descreva o descarte e destinação final dos resíduos." }),
  recycledMaterials: z.string().min(1, { message: "Por favor, insira a quantidade de materiais reciclados utilizados." }),
  energyConsumption: z.string().min(1, { message: "Por favor, insira o consumo de energia." }),
  objectives: z.string().min(10, { message: "Por favor, descreva os objetivos e metas da empresa." }),
  certificates: z.string().optional(),
  branches: z.string().min(1, { message: "Por favor, liste as filiais da empresa." }),
  esgPractices: z.string().min(1, { message: "Por favor, selecione se a empresa utiliza práticas de ESG." }),
  esgPracticesDescription: z.string().optional(),
});

export default function SustainabilityReportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      companyOverview: "",
      carbonEmissions: "",
      waterConsumption: "",
      wasteTypes: "",
      wasteAmount: "",
      wasteDisposal: "",
      recycledMaterials: "",
      energyConsumption: "",
      objectives: "",
      certificates: "",
      branches: "",
      esgPractices: "",
      esgPracticesDescription: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Transformando os dados em uma string concatenada
      const concatenatedData = `
        Nome da Empresa: ${values.companyName}
        Visão Geral da Empresa: ${values.companyOverview}
        Emissões de Carbono: ${values.carbonEmissions}
        Consumo de Água: ${values.waterConsumption}
        Tipos de Resíduos: ${values.wasteTypes}
        Quantidade de Resíduos: ${values.wasteAmount}
        Descarte e Destinação dos Resíduos: ${values.wasteDisposal}
        Materiais Reciclados Utilizados: ${values.recycledMaterials}
        Consumo de Energia: ${values.energyConsumption}
        Objetivos e Metas da Empresa: ${values.objectives}
        Certificados: ${values.certificates || 'Não fornecido'}
        Filiais da Empresa: ${values.branches}
        Práticas ESG: ${values.esgPractices}
        Descrição das Práticas ESG: ${values.esgPracticesDescription || 'Não fornecido'}
      `;
  
      // Enviar os dados para a API do Gemini para gerar a página HTML
      const response = await axios.post("http://localhost:5000/api/gemini", {
        reportData: concatenatedData,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      }
      });
  
      // Exemplo de como lidar com a resposta
      if (response.status === 200) {
        const { htmlContent } = response.data;
        toast({ title: "Relatório enviado", description: "Página HTML gerada com sucesso!" });
        // Agora você pode fazer algo com o HTML, como exibir na página ou armazenar
        console.log(htmlContent); // Exemplo de exibição do HTML no console
      } else {
        throw new Error("Erro ao gerar a página HTML");
      }
  
      form.reset(); // Resetar o formulário após o envio
    } catch (error) {
      toast({ title: "Erro", description: "Erro ao enviar relatório." });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Header />
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Relatório de Sustentabilidade</CardTitle>
          <CardDescription>Preencha os dados de sustentabilidade da sua empresa de calçados.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Campo para o nome da empresa */}
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Empresa</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nome da Empresa" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo para visão geral da empresa */}
              <FormField
                control={form.control}
                name="companyOverview"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visão Geral da Empresa</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Visão geral da empresa" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo para as emissões de carbono */}
              <FormField
                control={form.control}
                name="carbonEmissions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emissões de Carbono</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Emissões de carbono" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo para o consumo de água */}
              <FormField
                control={form.control}
                name="waterConsumption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Consumo de Água</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Consumo de água" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo para os tipos de resíduos */}
              <FormField
                control={form.control}
                name="wasteTypes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipos de Resíduos Gerados</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Liste os tipos de resíduos gerados" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo para a quantidade de resíduos */}
              <FormField
                control={form.control}
                name="wasteAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade de Resíduos Gerados</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Quantidade de resíduos" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo para o descarte e destinação dos resíduos */}
              <FormField
                control={form.control}
                name="wasteDisposal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descarte e Destinação dos Resíduos</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Descreva o descarte e destinação final dos resíduos" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo para materiais reciclados */}
              <FormField
                control={form.control}
                name="recycledMaterials"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Materiais Reciclados Utilizados</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Quantidade de materiais reciclados utilizados" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo para o consumo de energia */}
              <FormField
                control={form.control}
                name="energyConsumption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Consumo de Energia</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Consumo de energia" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo para os objetivos e metas */}
              <FormField
                control={form.control}
                name="objectives"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objetivos e Metas da Empresa</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Descreva os objetivos e metas da empresa" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo opcional para certificados */}
              <FormField
                control={form.control}
                name="certificates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certificados</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Certificados (opcional)" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo para as filiais */}
              <FormField
                control={form.control}
                name="branches"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Filiais da Empresa</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Liste as filiais da empresa" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo para práticas ESG */}
              <FormField
                control={form.control}
                name="esgPractices"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Práticas ESG</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="A empresa adota práticas ESG? (sim/não)" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo opcional para descrição das práticas ESG */}
              <FormField
                control={form.control}
                name="esgPracticesDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição das Práticas ESG</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Descrição das práticas ESG adotadas pela empresa (opcional)" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar Relatório"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

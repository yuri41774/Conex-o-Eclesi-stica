// src/index.ts
// Ponto de entrada para o bundle UMD via Webpack
// Este arquivo expõe funções utilitárias para integração Supabase e funcionalidades principais do app

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://db.rahhplphegvvdehrumyp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhaGhwbHBoZWd2dmRlaHJ1bXlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MDk2NDMsImV4cCI6MjA2NjI4NTY0M30.EDM-RotlChTCWiisI4o5okQ6Llee1ZaQEAcLaphBqTs';

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

export async function getPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('timestamp', { ascending: true });
  if (error) throw error;
  return data;
}

export async function getChatMessages() {
  const { data, error } = await supabase
    .from('chatMessages')
    .select('*')
    .order('timestamp', { ascending: true });
  if (error) throw error;
  return data;
}

// Função utilitária para upload de avatar (Edge Function)
export async function uploadAvatar(file: File, userId: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('userId', userId);
  const edgeUrl = 'https://db.rahhplphegvvdehrumyp.supabase.co/functions/v1/upload-avatar';
  const response = await fetch(edgeUrl, {
    method: 'POST',
    body: formData
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Erro desconhecido');
  return result;
}

// Exemplo de exportação para UMD
export default {
  supabase,
  getUserProfile,
  getPosts,
  getChatMessages,
  uploadAvatar
};

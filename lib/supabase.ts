import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pxfkbhbioyycgppmsjco.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4ZmtiaGJpb3l5Y2dwcG1zamNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MjI0MjUsImV4cCI6MjA1OTI5ODQyNX0.ypnEc2ktt1NP6C3QYGuzRvo0YNF1kx_DqppG1s4ZD_8';

export const supabase = createClient(supabaseUrl, supabaseKey); 
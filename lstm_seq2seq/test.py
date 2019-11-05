import os, sys

from keras.models import Model
from keras.layers import Input, LSTM, GRU, Dense, Embedding
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.utils import to_categorical
import numpy as np
import matplotlib.pyplot as plt

BATCH_SIZE = 64
EPOCHS = 20
LSTM_NODES =256
NUM_SENTENCES = 3000 # sentences to train
MAX_SENTENCE_LENGTH = 50
MAX_NUM_WORDS = 20000
EMBEDDING_SIZE = 100

input_sentences = []

output_sentences = []
output_sentences_inputs = []

count = 0
for line in open(r'combination_questions.txt', encoding="utf-8"):
    count += 1
    # print(count, NUM_SENTENCES)
    if count > NUM_SENTENCES:
        break

    input_sentence = line.split('","ans', 1)[0].strip().split('":"', 1)[-1]
    output = line.split('","answer":', 1)[-1].strip().split('}', 1)[0].replace('","', " ").replace('"', "").replace('[', "").replace(']', "")
       
    output_sentence = output + ' <eos>'
    # print("The output is: ", output)
    # print("The outputsentence is: ", output_sentence) 
    output_sentence_input = '<sos> ' + output

    input_sentences.append(input_sentence) # encoder input
    output_sentences.append(output_sentence) # decoder output
    output_sentences_inputs.append(output_sentence_input) # decoder input

print("num samples input:", len(input_sentences))
print("num samples output:", len(output_sentences))
print("num samples output input:", len(output_sentences_inputs))

print("Input sentence: ", input_sentences[172])
print("Output sentence: ", output_sentences[172])
print("Input Output: ", output_sentences_inputs[172])

''' Integer representation '''
# Tokenize the input
input_tokenizer = Tokenizer(num_words=MAX_NUM_WORDS)
input_tokenizer.fit_on_texts(input_sentences)
input_integer_seq = input_tokenizer.texts_to_sequences(input_sentences)

word2idx_inputs = input_tokenizer.word_index
print('Total unique words in the input: %s' % len(word2idx_inputs))

max_input_len = max(len(sen) for sen in input_integer_seq)
print("Length of longest sentence in input: %g" % max_input_len)

# Tokenise output
output_tokenizer = Tokenizer(num_words=MAX_NUM_WORDS, filters='')
output_tokenizer.fit_on_texts(output_sentences + output_sentences_inputs)
output_integer_seq = output_tokenizer.texts_to_sequences(output_sentences)
output_input_integer_seq = output_tokenizer.texts_to_sequences(output_sentences_inputs)
# print(output_input_integer_seq)
word2idx_outputs = output_tokenizer.word_index
print('Total unique words in the output: %s' % len(word2idx_outputs))

num_words_output = len(word2idx_outputs) + 1
max_out_len = max(len(sen) for sen in output_integer_seq)
print("Length of longest sentence in the output: %g" % max_out_len)

encoder_input_sequences = pad_sequences(input_integer_seq, maxlen=max_input_len)
print("encoder_input_sequences.shape:", encoder_input_sequences.shape)
print("encoder_input_sequences[172]:", encoder_input_sequences[172])

# check words numbers
# print(word2idx_inputs["is"])
# print(word2idx_inputs["it"])

decoder_input_sequences = pad_sequences(output_input_integer_seq, maxlen=max_out_len, padding='post')
print("decoder_input_sequences.shape:", decoder_input_sequences.shape)
print("decoder_input_sequences[172]:", decoder_input_sequences[172])

print(word2idx_outputs["<sos>"])
print(word2idx_outputs["filter_location"])
print(word2idx_outputs["compare_equal"])

''' Word embenddings '''


